import { render, screen } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { mocked } from 'ts-jest/utils'; // -- yarn add ts-jest -D
import { getPrismicClient } from '../../services/prismic';

const posts = [
	{
		slug: 'my-new-post',
		title: 'My New Post',
		excerpt: 'Post excerpt',
		updatedAt: 'Marc, 10',
	},
];

jest.mock('../../services/prismic');

describe('Posts page', () => {
	it('should render the posts page', () => {
		render(<Posts posts={posts} />);

		expect(screen.getByText('My New Post')).toBeInTheDocument();
	});

	it('should load one post', async () => {
		const getPrismicClientMocked = mocked(getPrismicClient);

		getPrismicClientMocked.mockReturnValueOnce({
			query: jest.fn().mockResolvedValueOnce({
				results: [
					{
						uid: 'my-new-post',
						data: {
							title: [{ type: 'heading', text: 'My New Post' }],
							content: [{ type: 'paragraph', text: 'Post excerpt' }],
						},
						last_publication_date: '04-01-2021',
					},
				],
			}),
		} as any);

		const response = await getStaticProps({});

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
});
