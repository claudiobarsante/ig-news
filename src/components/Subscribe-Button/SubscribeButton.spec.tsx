import { render, screen, fireEvent } from '@testing-library/react';
import { SubscribeButton } from '.';
import { signIn, useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils'; // -- yarn add ts-jest -D
import { useRouter } from 'next/router';
// -- check client.d.ts next-auth to see return type of a session
jest.mock('next-auth/client');

jest.mock('next/router');

describe('Subscribe button component', () => {
	it('should render Subscribe button with text "Subscribe now"', () => {
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([null, false]); // -- user is not signed in

		render(<SubscribeButton />);

		expect(screen.getByText('Subscribe now')).toBeInTheDocument();
	});

	it('should redirect user to sign in when not authenticated', () => {
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([null, false]); // -- user is not signed in

		const signInMocked = mocked(signIn);

		render(<SubscribeButton />);

		const subscribeButton = screen.getByText('Subscribe now');

		fireEvent.click(subscribeButton);

		expect(signInMocked).toHaveBeenCalled();
	});

	it('should redirect to Posts page when user has an active subscription', () => {
		// -- mocking that the user is signed in
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([
			{
				user: {
					name: 'John Doe',
					email: 'john.doe@example.com',
				},
				activeSubscription: 'fake-active-subscription',
				expires: 'fake-expires',
			},

			false,
		]);

		const useRouterMocked = mocked(useRouter);
		const pushMock = jest.fn();

		useRouterMocked.mockReturnValueOnce({
			push: pushMock,
		} as any);

		render(<SubscribeButton />);

		const subscribeButton = screen.getByText('Subscribe now');

		fireEvent.click(subscribeButton);

		expect(pushMock).toHaveBeenCalled();
		expect(pushMock).toHaveBeenCalledWith('/posts');
	});

	// it('should renders SignIn button for  authenticated user', () => {
	// 	const useSessionMocked = mocked(useSession);
	// 	useSessionMocked.mockReturnValueOnce([
	// 		{
	// 			user: {
	// 				name: 'John Doe',
	// 				email: 'john.doe@example.com',
	// 			},
	// 			expires: 'fake-expires',
	// 		},

	// 		false,
	// 	]);
	// 	render(<SubscribeButton />);

	// 	expect(screen.getByText('John Doe')).toBeInTheDocument();
	// });
});
