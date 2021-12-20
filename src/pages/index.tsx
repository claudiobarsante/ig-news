import { GetStaticProps } from 'next';
import Head from 'next/head';
import Button from '../components/Button';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './../styles/pages/home.module.scss';
import { FaGithub } from 'react-icons/fa';
type Props = {
	product: {
		priceId: string;
		amount: string;
	};
};
export default function Home({ product }: Props) {
	const fake = () => {
		console.log('fake');
	};
	return (
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>

			<main className={styles['content-container']}>
				<section className={styles['hero']}>
					<span className={styles['hero__greeting']}> 👏 Hey, welcome</span>
					<h1 className={styles['hero__title']}>
						News about <span className={styles['colored']}>React</span> world
					</h1>
					<p className={styles['hero__description']}>
						Get access to all the publications <br />
						<span className={styles['amount']}> for {product.amount} month</span>
					</p>
					<SubscribeButton />
				</section>
				<picture>
					<img src='/images/avatar.svg' alt='Girl seated on a chair coding on an laptop' />
				</picture>
				<Button
					type='button'
					onClick={fake}
					icon={<FaGithub />}
					state='logedOut'
					text='user name'
				/>
			</main>
		</>
	);
}

// -- SSG only for pages that renders the same content for all users
export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve(process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_API_ID, {
		expand: ['product'], //get all information about the product
	});

	const product = {
		priceId: price.id,
		amount: new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price.unit_amount / 100), //price.unit_amount is in cents, so have to /100
	};

	return {
		props: {
			product,
		},
		revalidate: 60 * 60 * 24, //24 hours - revalidate is in seconds, so 60sec * 60 min * 24 hours
	};
};
