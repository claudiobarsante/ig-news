import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/Subscribe-Button';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

type Props = {
	product: {
		priceId: string;
		amount: number;
	};
};
export default function Home({ product }: Props) {
	return (
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>

			<main className={styles.contentContainer}>
				<section className={styles.hero}>
					<span> 👏 Hey, welcome</span>
					<h1>
						News about <span>React</span> world
					</h1>
					<p>
						Get access to all the publications <br />
						<span> for {product.amount} month</span>
					</p>
					<SubscribeButton priceId={product.priceId} />
				</section>
				<picture>
					<img src='/images/avatar.svg' alt='Girls seated on a chair coding on an laptop' />
				</picture>
			</main>
		</>
	);
}

// -- SSG only for pages that renders the same content for all users
export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve('price_1J2LKhG5gxMlocmAtkInMz1J', {
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
