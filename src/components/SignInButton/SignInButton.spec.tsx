import { render, screen } from '@testing-library/react';
import { SignInButton } from '.';
import { useSession } from 'next-auth/client';
import { mocked } from 'jest-mock';

// -- check client.d.ts next-auth to see return type of a session
jest.mock('next-auth/client');

describe('SignIn button component', () => {
	it('should render SignIn button with text "Sign in with Github" for not authenticated user', () => {
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([null, false]);

		render(<SignInButton />);

		expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
	});

	it('should render SignIn button for  authenticated user', () => {
		// -- mocking that the user is signed in
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([
			{
				user: {
					name: 'John Doe',
					email: 'john.doe@example.com',
				},
				expires: 'fake-expires',
			},

			false,
		]);
		render(<SignInButton />);

		expect(screen.getByText('John Doe')).toBeInTheDocument();
	});
});
