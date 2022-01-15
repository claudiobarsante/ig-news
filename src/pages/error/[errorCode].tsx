import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

const Error = () => {
	return <h1>Page error</h1>;
};

export default Error;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
	console.log('context---', params);
	return {
		props: {},
	};
};
