import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './../../styles/pages/posts.module.scss';
import Link from 'next/link';

import { initializeApollo } from '../../graphql/lib/apolloClient';
import { ALL_POSTS_QUERY, LOAD_MORE_POSTS_QUERY } from '../../graphql/queries';
import { gql, useQuery } from '@apollo/client';
import { LoadMorePosts, LoadMorePostsVariables } from './../../graphql/generated/LoadMorePosts';
import ConvertDateTime from '../../utils/convertDateTime';
type Post = {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
};

const DEFAULT_LENGTH = 3;
export default function Posts() {
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

	return (
		<>
			<Head>
				<title>Posts | Ignews</title>
			</Head>
			<main className={styles['container']}>
				<section className={styles['posts']}>
					{data.posts.map(post => (
						<Link key={post.slug} href={`/post/${post.slug}`}>
							<a className={styles['post-link']}>
								<time className={styles['post-link__time']}>{ConvertDateTime(post.updatedAt)}</time>
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
