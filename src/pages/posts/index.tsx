import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';

export default function Posts() {
	return (
		<>
			<Head>
				<title>Posts | Ignews</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>
					<a href='#'>
						<time>12 de março de 2021</time>
						<strong>Create a MonoRepo</strong>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis aspernatur
							numquam ipsam praesentium est iusto? Quasi architecto impedit ipsum officiis.
						</p>
					</a>
					<a href='#'>
						<time>12 de março de 2021</time>
						<strong>Create a MonoRepo</strong>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis aspernatur
							numquam ipsam praesentium est iusto? Quasi architecto impedit ipsum officiis.
						</p>
					</a>
					<a href='#'>
						<time>12 de março de 2021</time>
						<strong>Create a MonoRepo</strong>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis aspernatur
							numquam ipsam praesentium est iusto? Quasi architecto impedit ipsum officiis.
						</p>
					</a>
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient();

	const response = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
		fetch: ['post.title', 'post.content'],
		pageSize: 100,
	});

	console.log('response', JSON.stringify(response, null, 2));

	return {
		props: {},
		//revalidate: 60 * 60 * 24, //24 hours - revalidate is in seconds, so 60sec * 60 min * 24 hours
	};
};
