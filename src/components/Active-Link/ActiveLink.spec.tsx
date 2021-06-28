import { render, screen } from '@testing-library/react';
import ActiveLink from '.';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return {
				asPath: '/', //route that you're currently accessing
			};
		},
	};
});

describe('ActiveLink component', () => {
	it('should renders the ActiveLink component correctly', () => {
		render(
			<ActiveLink href='/' activeClassName='active'>
				<a>Home</a>
			</ActiveLink>
		);

		expect(screen.getByText('Home')).toBeInTheDocument();
	});

	it('the <a> should have the class active if the asPath has the same route as the ActiveLink component', () => {
		render(
			<ActiveLink href='/' activeClassName='active'>
				<a>Home</a>
			</ActiveLink>
		);

		expect(screen.getByText('Home')).toHaveClass('active');
	});
});
