import { render } from '@testing-library/react';
import ActiveLink from '.';

jest.mock('next/router', () => {
	return {
		useRouter() {
			return {
				asPath: '/',
			};
		},
	};
});

describe('ActiveLink component', () => {
	it('should renders the ActiveLink component correctly', () => {
		const { getByText } = render(
			<ActiveLink href='/' activeClassName='active'>
				<a>Home</a>
			</ActiveLink>
		);

		expect(getByText('Home')).toBeInTheDocument();
	});

	it('the <a> should have the class active if the asPath has the same route as the ActiveLink component', () => {
		const { getByText } = render(
			<ActiveLink href='/' activeClassName='active'>
				<a>Home</a>
			</ActiveLink>
		);

		expect(getByText('Home')).toHaveClass('active');
	});
});
