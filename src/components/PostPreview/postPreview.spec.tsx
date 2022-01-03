import { render, screen, fireEvent } from '@testing-library/react';
import { PostPreview } from '.';
import { LoadMorePosts_posts } from 'graphql/generated/LoadMorePosts';
import { mocked } from 'jest-mock';
import convertDateTime from '../../utils/convertDateTime';

const post: LoadMorePosts_posts = {
	id: 'ckxjc2rqgwimt0e82jas9u0pm',
	content: { __typename: 'RichText', html: '<p>Esse post é de DevOps</p>' },
	name: 'Esse é de DevOps',
	slug: 'esse-e-de-devops',
	updatedAt: '2021-12-23T19:04:01.108814+00:00',
	__typename: 'Post',
};

jest.mock('../../utils/convertDateTime');

describe('<PostPreview/>', () => {
	it('should render the <PostPreview/>', () => {
		const mockedConvertDateTime = mocked(convertDateTime);
		mockedConvertDateTime.mockReturnValue('23 de dezembro de 2021');
		render(<PostPreview postContent={post} />);

		expect(screen.getByText('Esse é de DevOps')).toBeInTheDocument();
		expect(screen.getByText('23 de dezembro de 2021')).toBeInTheDocument();

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/post/esse-e-de-devops');
	});
});
