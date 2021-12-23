import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './../../styles/pages/posts.module.scss';
import Link from 'next/link';
import { initializeApollo } from '../../graphql/lib/apolloClient';
import { LOAD_MORE_POSTS_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { LoadMorePosts, LoadMorePostsVariables } from './../../graphql/generated/LoadMorePosts';
import ConvertDateTime from '../../utils/convertDateTime';
import { useEffect, useState } from 'react';
import { parseQueryStringToWhere } from '../../utils/filter';
import { PostOrderByInput } from '../../graphql/generated/globalTypes';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';
import { useRouter } from 'next/router';

const DEFAULT_LENGTH = 3;

export type Category = {
	[name: string]: boolean;
};

export const filterItems = [
	{ name: 'category', type: 'checkbox' },
	{ name: 'author', type: 'checkbox' },
	{ name: 'orderBy', type: 'radio' },
];

export default function Posts({ filterItems }) {
	const [radio, setRadio] = useState('publishedAt_DESC');
	const [categories, setCategories] = useState<Category>({
		testing: false,
		programming: false,
	});

	const { push, query, pathname, asPath } = useRouter();

	console.log('query client', query);
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

		return;
	};

	const handleShowMore = () => {
		fetchMore({
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

	return (
		<>
			<Head>
				<title>Posts | Ignews</title>
			</Head>
			<main className={styles['container']}>
				<aside>
					<fieldset>
						<h3>Categories</h3>
						<label>
							<input
								type='checkbox'
								name='testing'
								onChange={handleCheck}
								checked={categories.testing}
							/>
							Testing
						</label>
						<label>
							<input
								type='checkbox'
								name='programming'
								onChange={handleCheck}
								checked={categories.programming}
							/>
							Programming
						</label>
					</fieldset>
					<section>
						<h3>Order by</h3>
						<input
							checked={radio === 'publishedAt_DESC'}
							id='newest'
							name='radioGroup'
							onChange={handleRadioChange}
							type='radio'
							value='publishedAt_DESC'
						/>
						<label htmlFor='newest'>Newest first</label>

						<input
							checked={radio === 'publishedAt_ASC'}
							id='oldest'
							name='radioGroup'
							onChange={handleRadioChange}
							type='radio'
							value='publishedAt_ASC'
						/>
						<label htmlFor='oldest'>Oldest first</label>
					</section>
				</aside>
				<section className={styles['posts']}>
					{data &&
						data.posts.map(post => (
							<Link key={post.slug} href={`/post/${post.slug}`}>
								<a className={styles['post-link']}>
									<time className={styles['post-link__time']}>
										{ConvertDateTime(post.updatedAt)}
									</time>
									<strong className={styles['post-link__title']}>{post.name}</strong>
									{/* <p className={styles['post-link__brief-description']}>{post.excerpt}</p> */}
									<div
										className={styles['post__content']}
										dangerouslySetInnerHTML={{ __html: post.content.html.slice(0, 300) + '...' }}
									/>
								</a>
							</Link>
						))}
				</section>
			</main>
			<button type='button' onClick={() => handleShowMore()}>
				Show more
			</button>
		</>
	);
}

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
			initialApolloState: apolloClient.cache.extract(),
			filterItems, //initial load to cache
		},
	};
};
