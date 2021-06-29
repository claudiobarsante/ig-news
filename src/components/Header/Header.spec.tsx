import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return {
				asPath: '/', //route that you're currently accessing
			};
		},
	};
});

// -- check client.d.ts next-auth to see return type of a session
jest.mock('next-auth/client', () => {
	return {
		useSession() {
			return [null, false];
		},
	};
});

describe('Header component', () => {
	it('should render the Header component correctly', () => {
		render(<Header />);

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Posts')).toBeInTheDocument();
	});
});
