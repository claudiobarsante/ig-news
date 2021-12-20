import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './../../styles/pages/posts.module.scss';
import Link from 'next/link';

import { initializeApollo } from '../../graphql/lib/apolloClient';
import { ALL_POSTS_QUERY, LOAD_MORE_POSTS_QUERY } from '../../graphql/queries';
import { gql, useQuery } from '@apollo/client';
import { LoadMorePosts, LoadMorePostsVariables } from './../../graphql/generated/LoadMorePosts';

type Post = {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
};

const DEFAULT_LENGTH = 3;
export default function Posts() {
	const { data, loading, error, fetchMore } = useQuery(LOAD_MORE_POSTS_QUERY, {
		variables: {
			first: DEFAULT_LENGTH,
			skip: 0,
		},
	});

	const handleShowMore = () => {
		fetchMore({
			variables: {
				first: DEFAULT_LENGTH,
				skip: data?.posts.length,
			},
		});
	};

	const posts = data.posts.map(post => {
		return {
			slug: post.slug,
			title: post.name,
			// -- try to find the first paragraph otherwise return ''
			excerpt: post.content.html.slice(0, 300) + '...',
			updatedAt: new Date(post.updatedAt).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
		};
	});

	return (
		<>
			<Head>
				<title>Posts | Ignews</title>
			</Head>
			<main className={styles['container']}>
				<section className={styles['posts']}>
					{posts.map(post => (
						<Link key={post.slug} href={`/post/${post.slug}`}>
							<a className={styles['post-link']}>
								<time className={styles['post-link__time']}>{post.updatedAt}</time>
								<strong className={styles['post-link__title']}>{post.title}</strong>
								{/* <p className={styles['post-link__brief-description']}>{post.excerpt}</p> */}
								<div
									className={styles['post__content']}
									dangerouslySetInnerHTML={{ __html: post.excerpt }}
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
