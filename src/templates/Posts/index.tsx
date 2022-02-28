import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
// -- Graphql
import { LoadMorePosts, LoadMorePostsVariables } from 'graphql/generated/LoadMorePosts';
import { PostOrderByInput } from 'graphql/generated/globalTypes';
import { LOAD_MORE_POSTS_QUERY } from 'graphql/queries';
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
export const DEFAULT_LENGTH = 3;

const PostsPageTemplate = ({ filterItems, postsCategories, postsFilters }: PostsPageProps) => {
	const [radio, setRadio] = useState('publishedAt_DESC');
	const [categories, setCategories] = useState<Category>({});

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
		let temp = {};
		Object.keys(postsCategories).forEach(key => (temp[key] = false));
		setCategories(temp);
	}, []);

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

	const handleShowMore = useCallback(() => {
		fetchMore({
			variables: {
				first: DEFAULT_LENGTH,
				skip: data?.posts.length,
				where: parseQueryStringToWhere({ queryString: query, filterItems }),
				orderBy: PostOrderByInput[query.orderBy as string],
			},
			//notifyOnNetworkStatusChange: true,
		});
	}, []);

	const handleRadioChange = useCallback((value: string) => {
		setRadio(value);
	}, []);

	const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCategories(categories => ({ ...categories, [e.target.name]: e.target.checked }));
	}, []);

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
						{postsCategories &&
							postsCategories.map(category => (
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
							{postsFilters &&
								postsFilters.map(filter => (
									<Radio
										key={filter.id}
										id={filter.id}
										label={filter.label}
										name={filter.name}
										value={filter.value}
										onChange={() => handleRadioChange(filter.value)}
										checked={radio === filter.value}
										onLabelClick={() => handleRadioChange(filter.value)}
									/>
								))}
							{/* <div className={styles['orderBy__radio']}>
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
							</div> */}
						</div>
					</fieldset>
				</aside>
				<section className={styles['posts']}>
					{data && data.posts.map(post => <PostPreview key={post.id} postContent={post} />)}
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
