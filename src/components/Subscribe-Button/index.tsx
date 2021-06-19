import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

type Props = {
	priceId: string;
};

/** places on Next that you could do operations in a safe way using
enviroment secret variables: 
getServerSideProps(SSR)
getStaticProps(SSG)
API routes
In this case will be the API Routes, because getServerSideProps(SSR) and
getStaticProps(SSG) are only used when the pages is rendering
 * 
*/
export function SubscribeButton({ priceId }: Props) {
	const [session] = useSession();
	const router = useRouter();

	// -- the user can only subscribe if it's logged in
	async function handleSubscribe() {
		if (!session) {
			signIn('github');
			return;
		}
		/** if the user already has an active subscription there's no need to subscribe again on Stripe */
		if (session.activeSubscription) {
			router.push('/posts');
			return;
		}
		// -- checkout session on Stripe
		try {
			const response = await api.post('/subscribe');
			const { sessionId } = response.data;

			const stripe = await getStripeJs();
			await stripe.redirectToCheckout({ sessionId });
		} catch (error) {
			alert(error.message);
		}
	}
	return (
		<button type='button' className={styles.subscribeButton} onClick={handleSubscribe}>
			Subscribe now
		</button>
	);
}
