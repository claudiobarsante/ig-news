import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Head from 'next/head';
import styles from './../../styles/pages/post.module.scss';
import { GET_POST_BY_SLUG_QUERY } from '../../graphql/queries';
import { DELETE_POST } from '../../graphql/mutations';
import { initializeApollo } from '../../graphql/lib/apolloClient';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';
import { GetPost, GetPostVariables } from './../../graphql/generated/GetPost';
import { DeletePost, DeletePostVariables } from './../../graphql/generated/DeletePost';
type Props = {
	post: { id: string; slug: string; title: string; content: string; updatedAt: string };
};

export default function Post({ post }: Props) {
	const router = useRouter();

	const [DeletePost, { data, loading, error }] = useMutation<DeletePost, DeletePostVariables>(
		DELETE_POST,
		{
			variables: {
				postId: post.id,
			},
			onCompleted: data => {
				console.log(data);
				router.push('/posts');
			},
			onError: error => {
				console.log('error===>', error);
			},
		}
	);

	const handleUpdate = () => {
		console.log('updated');
	};

	if (loading) {
		return (
			<div className={styles['spinner-container']}>
				<LoadingSpinner data-testid='spinner' size='large' theme='dark' />
			</div>
		);
	}
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
			<section>
				<button type='button' onClick={() => handleUpdate()}>
					update
				</button>
				<button type='button' onClick={() => DeletePost()}>
					delete
				</button>
			</section>
		</>
	);
}

/** Remember that all pages generated with getStaticProps() are desprotected and all the content will be igual for all
 * users. To see all the post content the user needs to be logged in and have a active subscription
 */
export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	//const session = await getSession({ req });
	const session = await getServerSession(req, res, authOptions);
	console.log('vsession-getServerSideProps', session); // with getSession() you could check the cookies if the user is logged in
	const { slug } = params;
	/** If user don't have an active subscription will be redirecto the home page */
	if (!session?.activeSubscription) {
		return {
			redirect: {
				destination: `/post/preview/${slug}`,
				permanent: false, // -- this is not permanent, maybe int the future the user get an active subscription, so no redirection will be needed. It's important for the web crawlers to understand this
			},
		};
	}

	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query<GetPost, GetPostVariables>({
		query: GET_POST_BY_SLUG_QUERY,
		variables: { slug: `${slug}` },
	});

	const post = {
		id: data.post.id,
		slug,
		title: data.post.name,
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
