import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './../../styles/pages/posts.module.scss';
import Link from 'next/link';
import { initializeApollo } from '../../graphql/lib/apolloClient';
import { LOAD_MORE_POSTS_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { LoadMorePosts, LoadMorePostsVariables } from './../../graphql/generated/LoadMorePosts';
import ConvertDateTime from '../../utils/convertDateTime';
import { useState } from 'react';

const DEFAULT_LENGTH = 3;

export type Category = {
	[name: string]: boolean;
};
export default function Posts() {
	const [radio, setRadio] = useState('');
	const [isChecked, setIsChecked] = useState<Category>({
		testing: false,
		programming: false,
	});

	const { data, loading, error, fetchMore } = useQuery<LoadMorePosts, LoadMorePostsVariables>(
		LOAD_MORE_POSTS_QUERY,
		{
			variables: {
				first: DEFAULT_LENGTH,
				skip: 0,
			},
		}
	);

	const handleShowMore = () => {
		fetchMore({
			variables: {
				first: DEFAULT_LENGTH,
				skip: data?.posts.length,
			},
		});
	};

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRadio(e.target.value);
		console.log('e -> value ', e.target.value);
	};

	const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updated = { ...isChecked, [e.target.name]: e.target.checked };

		setIsChecked(updated);
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
								checked={isChecked.testing}
							/>
							Testing
						</label>
						<label>
							<input
								type='checkbox'
								name='programming'
								onChange={handleCheck}
								checked={isChecked.programming}
							/>
							Programming
						</label>
					</fieldset>
					<section>
						<h3>Order by</h3>
						<input
							checked={radio === 'newest'}
							id='newest'
							name='radioGroup'
							onChange={handleRadioChange}
							type='radio'
							value='newest'
						/>
						<label htmlFor='newest'>Newest first</label>

						<input
							checked={radio === 'oldest'}
							id='oldest'
							name='radioGroup'
							onChange={handleRadioChange}
							type='radio'
							value='oldest'
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

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query<LoadMorePosts, LoadMorePostsVariables>({
		query: LOAD_MORE_POSTS_QUERY,
		variables: {
			first: DEFAULT_LENGTH,
			skip: 0,
		},
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(), //initial load to cache
		},
		revalidate: 60 * 60 * 24, //24 hours - revalidate is in seconds, so 60sec * 60 min * 24 hours
	};
};
