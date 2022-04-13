import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
// -- Graphql
import { LoadMorePosts, LoadMorePostsVariables } from 'graphql/generated/LoadMorePosts';
import { PostOrderByInput } from 'graphql/generated/globalTypes';
import { LOAD_MORE_POSTS_QUERY, QUERY_POSTS_PAGE } from 'graphql/queries';
// -- utils
import { parseQueryStringToWhere } from 'utils/filter';
import { checkPostsCount } from 'utils/checkPostsCount';
// -- Styles
import styles from 'templates/Posts/posts.module.scss';
// -- Custom components
import CheckBox from 'components/Checkbox';
import { PostPreview } from 'components/PostPreview';
import Radio from 'components/Radio';
// -- Types
import { Category, FilterItemsTypes, PostsPageProps } from './types';
import { QueryPostsPage, QueryPostsPageVariables } from 'graphql/generated/QueryPostsPage';
import { ParsedUrlQueryInput } from 'querystring';

export const DEFAULT_LENGTH = 3;

const PostsPageTemplate = ({ filterItems }: PostsPageProps) => {
	const [radio, setRadio] = useState('publishedAt_DESC');
	const [categories, setCategories] = useState<Category>({});
	const { push, query, pathname } = useRouter();

	const { data, error, fetchMore, loading } = useQuery<QueryPostsPage, QueryPostsPageVariables>(
		QUERY_POSTS_PAGE,
		{
			notifyOnNetworkStatusChange: true,
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

	// useEffect(() => {
	// 	let temp = {};
	// 	data?.categories && Object.keys(data.categories).forEach(key => (temp[key] = false));
	// 	setCategories(temp);
	// }, []);

	useEffect(() => {
		updateQueryResuts();
	}, [radio, categories]);

	const updateQueryResuts = () => {
		if (!query) return;

		let updatedQuery: any = {};

		if (Object.keys(categories).length > 0) {
			updatedQuery.category = [];

			for (let item in categories) {
				if (categories[item]) {
					const currentCategories = updatedQuery.category;
					//updatedQuery = { ...updatedQuery, category: xor(currentCategories, [item]) };
					updatedQuery = { ...updatedQuery, category: [...currentCategories, ...[item]] };
				}
			}
		}

		updatedQuery = { ...updatedQuery, orderBy: radio };

		push({ pathname: '/posts', query: updatedQuery });
		return;
	};

	const handleShowMore = useCallback(() => {
		fetchMore({
			variables: {
				first: DEFAULT_LENGTH,
				skip: data.posts.length,
			},
		});
	}, [data?.posts]);

	const handleRadioChange = useCallback((value: string) => {
		setRadio(value);
	}, []);

	const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log('e--', e.target.name, e.target.checked, 'categories', categories);
		setCategories(categories => ({ ...categories, [e.target.name]: e.target.checked }));
	}, []);

	const isToShowButton = checkPostsCount(
		data?.postsConnection?.aggregate?.count,
		data?.posts?.length
	);

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
						{data?.categories &&
							data.categories.map(category => (
								<CheckBox
									key={category.id}
									isChecked={categories[category.name]}
									label={category.label}
									labelFor={category.name}
									name={category.name}
									onCheck={handleCheckboxChange}
								/>
							))}

						<div className={styles['orderBy']}>
							<h3>Order by</h3>
							{data?.filters &&
								data.filters.map(filter => (
									<Radio
										key={filter.id}
										id={filter.id}
										label={filter.label}
										name={filter.name}
										value={filter.value}
										onCheck={() => handleRadioChange(filter.value)}
										defaultChecked={radio === filter.value}
									/>
								))}
						</div>
					</fieldset>
				</aside>
				<section className={styles['posts']}>
					{data?.posts && data.posts.map(post => <PostPreview key={post.id} postContent={post} />)}
					<div className={styles['loading-container']}>
						{isToShowButton && (
							<button className={styles['button']} type='button' onClick={() => handleShowMore()}>
								Show more posts
							</button>
						)}

						{loading && (
							<img className={styles['loading']} src='/images/dots.svg' alt='Loading more...' />
						)}
					</div>
				</section>
			</main>
		</>
	);
};

export default PostsPageTemplate;
