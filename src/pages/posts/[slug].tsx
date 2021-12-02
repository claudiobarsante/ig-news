/** Here we are dynamically creating the post page
 * with all it's content*/

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import styles from './../../styles/pages/post.module.scss';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../graphql/lib/apolloClient';

type Props = {
	post: { slug: string; title: string; content: string; updatedAt: string };
};

const GET_POST_BY_SLUG_QUERY = gql`
	query getPost($slug: String) {
		post(where: { slug: $slug }) {
			id
			createdAt
			slug
			name
			content {
				html
				text
				markdown
			}
		}
	}
`;
/*dangerouslySetInnerHTML is a way to render content as Html, but you have to be
aware the if this html has any malicious script could cause problems. Use dangerouslySetInnerHTML with caution */
export default function Post({ post }: Props) {
	return (
		<>
			<Head>
				<title>{post.title} | Ignews</title>
			</Head>
			<main className={styles['container']}>
				<article className={styles['post']}>
					<h1 className={styles['post__title']}>{post.title}</h1>
					<time className={styles['post__time']}>{post.updatedAt}</time>
					<div
						className={styles['post__content']}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</article>
			</main>
		</>
	);
}

/** Remember that all pages generated with getStaticProps() are desprotected and all the content will be igual for all
 * users. To see all the post content the user needs to be logged in and have a active subscription
 */
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
	const session = await getSession({ req }); // with getSession() you could check the cookies if the user is logged in
	const { slug } = params;
	/** If user don't have an active subscription will be redirecto the home page */
	if (!session?.activeSubscription) {
		return {
			redirect: {
				destination: `/posts/preview/${slug}`,
				permanent: false, // -- this is not permanent, maybe int the future the user get an active subscription, so no redirection will be needed. It's important for the web crawlers to understand this
			},
		};
	}

	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query({
		query: GET_POST_BY_SLUG_QUERY,
		variables: { slug: `${slug}` },
	});

	const post = {
		slug,
		title: data.post.title,
		content: data.post.content.html,
		updatedAt: new Date(data.post.updatedAt).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		}),
	};

	return {
		props: { post },
	};
};
