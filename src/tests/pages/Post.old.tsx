import { render, screen } from '@testing-library/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { mocked } from 'ts-jest/utils'; // -- yarn add ts-jest -D
import { getPrismicClient } from '../../services/prismic';

const post = {
	slug: 'my-new-post',
	title: 'My New Post',
	content: '<p>Post excerpt</p>',
	updatedAt: 'March, 10',
};
jest.mock('../../services/prismic');

describe('Posts page', () => {
	it('should render the posts page', () => {
		render(<Post post={post} />);

		expect(screen.getByText('My New Post')).toBeInTheDocument();
		expect(screen.getByText('Post excerpt')).toBeInTheDocument();
	});

	it('should redirect user to post preview page if no subscription is found', async () => {
		const response = await getServerSideProps({
			req: {
				cookies: {},
			},
		} as any);

		expect(response).toEqual(
			expect.objectContaining({
				// -- at least has this object
				props: {
					posts: [
						{
							slug: 'my-new-post',
							title: 'My New Post',
							excerpt: 'Post excerpt',
							updatedAt: '01 de abril de 2021',
						},
					],
				},
			})
		);
	});

	// it('should load one post', async () => {
	// 	const getPrismicClientMocked = mocked(getPrismicClient);

	// 	getPrismicClientMocked.mockReturnValueOnce({
	// 		query: jest.fn().mockResolvedValueOnce({
	// 			results: [
	// 				{
	// 					uid: 'my-new-post',
	// 					data: {
	// 						title: [{ type: 'heading', text: 'My New Post' }],
	// 						content: [{ type: 'paragraph', text: 'Post excerpt' }],
	// 					},
	// 					last_publication_date: '04-01-2021',
	// 				},
	// 			],
	// 		}),
	// 	} as any);

	// 	const response = await getStaticProps({});

	// 	expect(response).toEqual(
	// 		expect.objectContaining({
	// 			// -- at least has this object
	// 			props: {
	// 				posts: [
	// 					{
	// 						slug: 'my-new-post',
	// 						title: 'My New Post',
	// 						excerpt: 'Post excerpt',
	// 						updatedAt: '01 de abril de 2021',
	// 					},
	// 				],
	// 			},
	// 		})
	// 	);
	// });
});
