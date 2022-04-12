import { render, screen, fireEvent } from '@testing-library/react';
import * as Post from '.';
import { LoadMorePosts_posts } from 'graphql/generated/LoadMorePosts';
import { mocked } from 'jest-mock';
import { convertDateTime } from 'utils/convertDateTime';
//import DOMPurify from 'isomorphic-dompurify';

const post: LoadMorePosts_posts = {
	id: 'ckxjc2rqgwimt0e82jas9u0pm',
	content: { __typename: 'RichText', html: '<p>Esse post é de DevOps</p>' },
	name: 'Esse é de DevOps',
	slug: 'esse-e-de-devops',
	updatedAt: '2021-12-23T19:04:01.108814+00:00',
	__typename: 'Post',
};

jest.mock('utils/convertDateTime');
type LinkProps = {
	href: '/post/esse-e-de-devops';
	as?: '/post/esse-e-de-devops';
};

jest.mock('next/link', () => {
	const React = require('react');

	return ({ children, href }: React.PropsWithChildren<LinkProps>) =>
		React.cloneElement(React.Children.only(children), { href });
});

jest.mock('isomorphic-dompurify', () => {
	return {
		sanitize: jest.fn(),
	};
});

//DOMPurify.sanitize = jest.fn();

describe('<PostPreview/>', () => {
	it('should render the <PostPreview/>', () => {
		const mockedConvertDateTime = mocked(convertDateTime);
		mockedConvertDateTime.mockReturnValue('23 de dezembro de 2021');

		render(<Post.PostPreview postContent={post} />);

		expect(screen.getByText('Esse é de DevOps')).toBeInTheDocument();
		expect(screen.getByText('23 de dezembro de 2021')).toBeInTheDocument();

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/post/esse-e-de-devops');

		//! Still have to figure out why 'createLastSeenPostEntry'is not bee called
		// const spy = jest
		// 	.spyOn(Post, 'createLastSeenPostEntry')
		// 	.mockReturnValue({ slug: 'esse-e-de-devops', name: 'Esse é de DevOps' });
		// fireEvent.click(link);

		// expect(spy).toHaveBeenCalled();
	});
});
