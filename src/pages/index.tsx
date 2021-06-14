import Head from 'next/head';
import { SubscribeButton } from '../components/Subscribe-Button';
import styles from './home.module.scss';
export default function Home() {
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
						<span> for $9.90 month</span>
					</p>
					<SubscribeButton />
				</section>

				<img src='/images/avatar.svg' alt='Girls seated on a chair coding on an laptop' />
			</main>
		</>
	);
}
