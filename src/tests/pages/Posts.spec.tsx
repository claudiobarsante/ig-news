import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import Posts from '../../pages/posts';

import { postMock, postFetchMoreMock } from '../mocks/mocks';
import apolloCache from '../../graphql/lib/apolloCache';

describe('Apollo', () => {
	it('should render posts', async () => {
		render(
			<MockedProvider mocks={[postMock]}>
				<Posts />
			</MockedProvider>
		);

		expect(screen.getByRole('button', { name: /show more/i }));
		await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument());
	});

	it('should render more posts', async () => {
		render(
			<MockedProvider mocks={[postMock, postFetchMoreMock]} cache={apolloCache}>
				<Posts />
			</MockedProvider>
		);

		await waitFor(() => expect(screen.getByText('test1')).toBeInTheDocument());

		const button = screen.getByRole('button', { name: /show more/i });
		userEvent.click(button);

		await waitFor(() => expect(screen.getByText('test2')).toBeInTheDocument());

		screen.logTestingPlaygroundURL();
	});
});
