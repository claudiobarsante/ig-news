/** when you are dynamically creating a page, you have to pass the parameter
 * inside brackets, in this case [slug].tsx . Here we are creating the post preview */

import { GetStaticPaths, GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../../services/prismic';
import Head from 'next/head';
import styles from '../post.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
	post: { slug: string; title: string; content: string; updatedAt: string };
};

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
			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<time>{post.updatedAt}</time>
					<div
						className={`${styles.postContent} ${styles.previewContent}`}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
					<div className={styles.continueReading}>
						Wanna continue reading?
						<Link href='/'>
							<a>Subscribe now </a>
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
	// -- if true, not a good idea because causes html shifiting see complete information: https://nextjs.org/docs/basic-features/data-fetching
};

/** Remember that all pages generated with getStaticProps() are desprotected and all the content will be igual for all
 * users. In this case the post preview is public, anyone can view it. So you can use getStaticProps
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params;

	const prismic = getPrismicClient();

	/*'post' is the type of the document in Prismic and the UID on Prismic we
     set to the value of slug. Even if it's not using the ...spread on the route [slug].tsx
     you have to convert slug to string, String(slug) because it's coming with default 
     type string | string[]*/
	const response = await prismic.getByUID('post', String(slug), {});

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content.splice(0, 3)), //getting only the first 3 blocks of the content
		updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
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
