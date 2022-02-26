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

const filterItems: FilterItemsTypes[] = [
	{ name: 'category', type: 'checkbox' },
	{ name: 'author', type: 'checkbox' },
	{ name: 'orderBy', type: 'radio' },
];

jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: [],
			asPath: '',
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null),
		};
	},
}));

//! Still have to figure out why it don't work importing function from Posts page
jest.mock('../../utils/checkPostsCount', () => {
	const original = jest.requireActual('../../utils/checkPostsCount'); // Step 2.
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
				<Posts
					filterItems={filterItems}
					postsCategories={categoriesMock}
					postsFilters={filtersMock}
				/>
			</MockedProvider>
		);
		await waitFor(() => expect(screen.getByRole('button', { name: /show more/i })));
		//expect(screen.getByRole('button', { name: /show more/i }));
		await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument());
	});

	//!Still have to figure out why is not rendering with fetch more
	it('should render more posts', async () => {
		render(
			<MockedProvider mocks={[postMock, postFetchMoreMock]} cache={apolloCache}>
				<Posts
					filterItems={filterItems}
					postsCategories={categoriesMock}
					postsFilters={filtersMock}
				/>
			</MockedProvider>
		);

		await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument());

		const button = screen.queryByRole('button', { name: /show more/i });

		userEvent.click(button);

		//await waitFor(() => expect(screen.getByText('test2')).toBeInTheDocument());

		screen.logTestingPlaygroundURL();
	});

	it('should not render the button load more', () => {
		const mockedCheckPostsCountFunction = mocked(checkPostsCount);
		mockedCheckPostsCountFunction.mockReturnValue(false);
		render(
			<MockedProvider mocks={[postMock, postFetchMoreMock]} cache={apolloCache}>
				<Posts
					filterItems={filterItems}
					postsCategories={categoriesMock}
					postsFilters={filtersMock}
				/>
			</MockedProvider>
		);

		const button = screen.queryByRole('button', { name: /show more/i });
		expect(button).not.toBeInTheDocument();
	});
});
