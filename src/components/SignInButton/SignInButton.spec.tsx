import { render, screen } from '@testing-library/react';
import { SignInButton } from '.';
import { useSession } from 'next-auth/react';
import { mocked } from 'jest-mock';

// -- check client.d.ts next-auth to see return type of a session
jest.mock('next-auth/react');

describe('SignIn button component', () => {
	it('should render SignIn button with text "Sign in with Github" for not authenticated user', () => {
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

		render(<SignInButton />);

		expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
	});

	it('should render SignIn button for  authenticated user', () => {
		// -- mocking that the user is signed in
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce({
			data: {
				user: {
					name: 'John Doe',
					email: 'john.doe@example.com',
				},
				expires: 'fake-expires',
			},
			status: 'authenticated',
		});
		render(<SignInButton />);

		expect(screen.getByText('John Doe')).toBeInTheDocument();
	});
});
