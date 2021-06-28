/** when you are dynamically creating a page, you have to pass the parameter
 * inside brackets, in this case [slug].tsx . Here we are creating the post page
 * with all it's content*/

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import Head from 'next/head';
import styles from './post.module.scss';

type Props = {
	post: { slug: string; title: string; content: string; updatedAt: string };
};

/*dangerouslySetInnerHTML is a way to render content as Html, but you have to be
aware the if this html has any malicious script could cause problems. Use dangerouslySetInnerHTML with caution */
export default function Post({ post }: Props) {
	return (
		<>
			<Head>
				<title>{post.title} | Ignews</title>
			</Head>
			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updatedAt}</time>
					<div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
				</article>
			</main>
		</>
	);
}

/** Remember that all pages generated with getStaticProps() are desprotected and all the content will be igual for all
 * users. To see all the post content the user needs to be logged in and have a active subscription
 */
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
	const session = await getSession({ req }); // with getSession() you could check if the user is logged in
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

	const prismic = getPrismicClient(req);

	/*'post' is the type of the document in Prismic and the UID on Prismic we
     set to the value of slug. Even if it's not using the ...spread on the route [slug].tsx
     you have to convert slug to string, String(slug) because it's coming with default 
     type string | string[]*/
	const response = await prismic.getByUID('post', String(slug), {});

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content),
		updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		}),
	};

	return {
		props: { post },
	};
};
