import { mocked } from 'jest-mock';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// -- Graphql
import apolloCache from '../../graphql/lib/apolloCache';
// -- components
import Posts from '../../pages/posts';
// -- types
import { FilterItemsTypes } from 'templates/Posts/types';
// -- Utils
import { checkPostsCount } from '../../utils/checkPostsCount';
// -- mocks
import { postMock, postFetchMoreMock, categoriesMock, filtersMock } from './mocks';
import PostsPageTemplate from '.';

const filterItems: FilterItemsTypes[] = [
	{ name: 'category', type: 'checkbox' },
	{ name: 'author', type: 'checkbox' },
	{ name: 'orderBy', type: 'radio' },
];

//? Pode mockar assim também
// jest.mock('next/router', () => ({
// 	useRouter() {
// 		return {
// 			route: '/',
// 			pathname: '',
// 			query: [],
// 			asPath: '',
// 			push: jest.fn(),
// 			events: {
// 				on: jest.fn(),
// 				off: jest.fn(),
// 			},
// 			beforePopState: jest.fn(() => null),
// 			prefetch: jest.fn(() => null),
// 		};
// 	},
// }));
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const push = jest.fn();

useRouter.mockImplementation(() => ({
	prefetch: jest.fn().mockResolvedValue(undefined),
	push,
	query: '',
	asPath: '',
	route: '/',
}));

jest.mock('../../utils/checkPostsCount', () => {
	const original = jest.requireActual('../../utils/checkPostsCount');
	return {
		...original,
		checkPostsCount: jest.fn(),
	};
});

describe('Apollo', () => {
	it('should render posts', async () => {
		const mockedCheckPostsCountFunction = mocked(checkPostsCount);
		mockedCheckPostsCountFunction.mockReturnValue(true);

		render(
			<MockedProvider mocks={[postMock]}>
				<PostsPageTemplate filterItems={filterItems} />
			</MockedProvider>
		);
		await waitFor(() => expect(screen.getByRole('button', { name: /show more/i })));
		//expect(screen.getByRole('button', { name: /show more/i }));
		await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument());
	});

	it('should render more posts', async () => {
		render(
			<MockedProvider mocks={[postMock, postFetchMoreMock]} cache={apolloCache}>
				<PostsPageTemplate filterItems={filterItems} />
			</MockedProvider>
		);

		await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument());

		userEvent.click(screen.queryByRole('button', { name: /show more/i }));

		await waitFor(() => expect(screen.getByText('test2')).toBeInTheDocument());

		//screen.logTestingPlaygroundURL();
	});

	it('should not render the button load more', () => {
		const mockedCheckPostsCountFunction = mocked(checkPostsCount);
		mockedCheckPostsCountFunction.mockReturnValue(false);
		render(
			<MockedProvider mocks={[postMock, postFetchMoreMock]} cache={apolloCache}>
				<PostsPageTemplate filterItems={filterItems} />
			</MockedProvider>
		);

		const button = screen.queryByRole('button', { name: /show more/i });
		expect(button).not.toBeInTheDocument();
	});

	it('should change push when selecting a category', async () => {
		const { container, debug } = render(
			<MockedProvider mocks={[postMock, postFetchMoreMock]} cache={apolloCache}>
				<PostsPageTemplate filterItems={filterItems} />
			</MockedProvider>
		);
		//debug(container);
		expect(await screen.findByRole('checkbox', { name: /programming/i })).toBeInTheDocument();

		userEvent.click(await screen.findByRole('checkbox', { name: /programming/i }));
		userEvent.click(await screen.findByRole('radio', { name: /newest first/i }));

		expect(push).toHaveBeenCalledWith({
			pathname: '/posts',
			query: { category: ['programming'], orderBy: 'publishedAt_ASC' },
		});
	});
});
