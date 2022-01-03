import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next';
import Head from 'next/head';
import styles from 'styles/pages/posts.module.scss';
import Link from 'next/link';
import { initializeApollo } from 'graphql/lib/apolloClient';
import { LOAD_MORE_POSTS_QUERY } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import { LoadMorePosts, LoadMorePostsVariables } from 'graphql/generated/LoadMorePosts';
import { convertDateTime } from 'utils/convertDateTime';
import { useEffect, useState } from 'react';
import { parseQueryStringToWhere } from 'utils/filter';
import { PostOrderByInput } from '../../graphql/generated/globalTypes';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';
import { useRouter } from 'next/router';
import { checkPostsCount } from 'utils/checkPostsCount';
import { PostPreview } from 'components/PostPreview';

const DEFAULT_LENGTH = 3;

export type Category = {
	[name: string]: boolean;
};

export const filterItems = [
	{ name: 'category', type: 'checkbox' },
	{ name: 'author', type: 'checkbox' },
	{ name: 'orderBy', type: 'radio' },
];

// export function checkPostsCount(totalPosts: number, currentPosts: number) {
// 	/*Graphcms has this property postsConnection that returns the total number of posts.
// 	return data?.postsConnection.aggregate.count > data?.posts.length
// 	So just compare the total x current number of posts. If they are equal there's no more posts tos how */
// 	return totalPosts > currentPosts;
// }

const Posts = ({ filterItems }) => {
	const [radio, setRadio] = useState('publishedAt_DESC');
	const [categories, setCategories] = useState<Category>({
		testing: false,
		programming: false,
	});

	const { push, query, pathname } = useRouter();

	const { data, loading, error, fetchMore } = useQuery<LoadMorePosts, LoadMorePostsVariables>(
		LOAD_MORE_POSTS_QUERY,
		{
			variables: {
				first: DEFAULT_LENGTH,
				skip: 0,
				where: parseQueryStringToWhere({ queryString: query, filterItems }),
				orderBy: query?.orderBy
					? PostOrderByInput[query.orderBy as string]
					: PostOrderByInput.publishedAt_DESC,
			},
		}
	);

	useEffect(() => {
		updateQueryResuts();
	}, [radio, categories]);

	const updateQueryResuts = () => {
		let updatedCategoriesQuery = [];

		for (let category in categories) {
			if (categories[category]) {
				if (updatedCategoriesQuery.indexOf(category) === -1) {
					updatedCategoriesQuery.push(category);
				}
			}
		}

		query['category'] = updatedCategoriesQuery;
		query['orderBy'] = radio;

		push({ pathname, query });
	};

	const handleShowMore = () => {
		fetchMore({
			notifyOnNetworkStatusChange: true,
			variables: {
				first: DEFAULT_LENGTH,
				skip: data?.posts.length,
				where: parseQueryStringToWhere({ queryString: query, filterItems }),
				orderBy: PostOrderByInput[query.orderBy as string],
			},
		});
	};

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRadio(e.target.value);
	};

	const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updated = { ...categories, [e.target.name]: e.target.checked };
		setCategories(updated);
	};

	const isToShowButton = checkPostsCount(data?.postsConnection.aggregate.count, data?.posts.length);

	return (
		<>
			<Head>
				<title>Posts | Ignews</title>
			</Head>
			<main className={styles['container']}>
				<div className={styles['top']}></div>
				<aside className={styles['aside']}>
					<fieldset className={styles['filters']}>
						<h3>Categories</h3>
						<label className={styles['checkbox-item']}>
							<input
								type='checkbox'
								name='testing'
								onChange={handleCheck}
								checked={categories.testing}
							/>
							<span>Testingdf gdgdf gdfgdfgdfgdfg</span>
						</label>
						<label className={styles['checkbox-item']}>
							<input
								type='checkbox'
								name='programming'
								onChange={handleCheck}
								checked={categories.programming}
							/>
							<span>Programming</span>
						</label>

						<div className={styles['orderBy']}>
							<h3>Order by</h3>
							<div className={styles['orderBy__radio']}>
								<input
									checked={radio === 'publishedAt_DESC'}
									id='newest'
									name='radioGroup'
									onChange={handleRadioChange}
									type='radio'
									value='publishedAt_DESC'
								/>
								<label htmlFor='newest'>Newest first</label>
							</div>
							<div className={styles['orderBy__radio']}>
								<input
									checked={radio === 'publishedAt_ASC'}
									id='oldest'
									name='radioGroup'
									onChange={handleRadioChange}
									type='radio'
									value='publishedAt_ASC'
								/>
								<label htmlFor='oldest'>Oldest first</label>
							</div>
						</div>
					</fieldset>
				</aside>
				<section className={styles['posts']}>
					{loading && <img src='/images/dots.svg' alt='Loading more...' />}

					{data && data.posts.map(post => <PostPreview postContent={post} />)}
				</section>
			</main>
			{isToShowButton && (
				<button type='button' onClick={() => handleShowMore()}>
					Show more
				</button>
			)}
		</>
	);
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async ({
	query,
}: GetServerSidePropsContext) => {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query<LoadMorePosts, LoadMorePostsVariables>({
		query: LOAD_MORE_POSTS_QUERY,
		variables: {
			first: DEFAULT_LENGTH,
			skip: 0,
			where: parseQueryStringToWhere({ queryString: query, filterItems }),
			orderBy: PostOrderByInput.publishedAt_DESC,
		},
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(), //initial load to cache
			filterItems,
		},
	};
};
