import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './../../styles/pages/posts.module.scss';
import Link from 'next/link';

import { initializeApollo } from '../../graphql/lib/apolloClient';
import { ALL_POSTS_QUERY, LOAD_MORE_POSTS_QUERY } from '../../graphql/queries';
import { gql, useQuery } from '@apollo/client';

type Post = {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
};

type Props = {
	posts: Post[];
};

const LOAD_MORE_POSTS = gql`
	query loadMorePosts($first: Int, $skip: Int) {
		posts(first: $first, skip: $skip) {
			id
			updatedAt
			slug
			name
			content {
				html
			}
		}
	}
`;
export default function Posts() {
	const { data, loading, error, fetchMore } = useQuery(LOAD_MORE_POSTS_QUERY, {
		variables: {
			first: 2,
			skip: 0,
		},
	});

	const handleShowMore = () => {
		console.log('passei');
		fetchMore({
			variables: {
				first: 2,
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

	const { data } = await apolloClient.query({
		query: LOAD_MORE_POSTS_QUERY,
		variables: {
			first: 2,
			skip: 0,
		},
	});

	// -- IMPORTANT : format all data that's needs formatation(currency,numbers,dates,price...)
	// -- on the server side, because if you do it on the client side
	// -- everytime that the page is accessed, the data will be formatted again !
	// -- if you can do it on the server side, do it because the data will be formatted only once !
	//console.log('response', JSON.stringify(response, null, 2));
	// const posts = data.posts.map(post => {
	// 	return {
	// 		slug: post.slug,
	// 		title: post.name,
	// 		// -- try to find the first paragraph otherwise return ''
	// 		excerpt: post.content.html.slice(0, 300) + '...',
	// 		updatedAt: new Date(post.updatedAt).toLocaleDateString('pt-BR', {
	// 			day: '2-digit',
	// 			month: 'long',
	// 			year: 'numeric',
	// 		}),
	// 	};
	//});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(), //initial load to cache
		},
		revalidate: 60 * 60 * 24, //24 hours - revalidate is in seconds, so 60sec * 60 min * 24 hours
	};
};
