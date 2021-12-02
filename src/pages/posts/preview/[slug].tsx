/*Here we are creating the post preview */

import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../../services/prismic';
import Head from 'next/head';
import styles from '../../../styles/pages/post.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../../graphql/lib/apolloClient';

type Props = {
	post: { slug: string; title: string; content: string; updatedAt: string };
};

const GET_POST_BY_SLUG_QUERY = gql`
	query getPost($slug: String) {
		post(where: { slug: $slug }) {
			id
			updatedAt
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
export default function PostPreview({ post }: Props) {
	const [session] = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.activeSubscription) router.push(`/posts/${post.slug}`);
	}, [session]);

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
						className={`${styles['post__content']} ${styles['post__content--preview']}`}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
					<div className={styles['continue-reading']}>
						Wanna continue reading?
						<Link href='/'>
							<a className={styles['continue-reading__subscribe']}>Subscribe now </a>
						</Link>
					</div>
				</article>
			</main>
		</>
	);
}
/**If a page has dynamic routes (documentation) and uses getStaticProps it needs to define a list of paths that have to be rendered to HTML at build time. */
/**if you leave paths empty [] all posts preview will be genereted only on the first user access, but if
 * you want that a preview post be statica generate on build  ou have to specify. */

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		//paths: [{ params: { slug: 'como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal' } }],
		paths: [],
		fallback:
			'blocking' /**If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path. */,
	}; //-- if false, then any paths not returned by getStaticPaths will result in a 404 page
	// -- if true, not a good idea because causes html shifiting information: https://nextjs.org/docs/basic-features/data-fetching
	/* and when google
	 -- try to index it for the first time may hcatch some errors 
	 -- because all the information may not be available see complete*/
};

/** Remember that all pages generated with getStaticProps() are desprotected and all the content will be igual for all
 * users. In this case the post preview is public, anyone can view it. So you can use getStaticProps
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params;

	const apolloClient = initializeApollo();

	const { data, error } = await apolloClient.query({
		query: GET_POST_BY_SLUG_QUERY,
		variables: { slug: `${slug}` },
	});

	console.log('error', error, 'data', data);
	const post = {
		slug,
		title: data.post.name,
		content: data.post.content.html.slice(0, 400),
		updatedAt: new Date(data.post.updatedAt).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		}),
	};
	return {
		props: { post },
		revalidate: 60 * 30, //once every 30 min
	};
};
