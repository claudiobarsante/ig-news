import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from '../../pages';
import { useSession } from 'next-auth/react';
import { mocked } from 'jest-mock';
import { stripe } from '../../services/stripe';

jest.mock('next/router');
// -- check client.d.ts next-auth to see return type of a session
jest.mock('next-auth/react');
jest.mock('../../services/stripe');

/** 
 * useSession() returns an object containing two values: data and status:

data: This can be three values: Session / undefined / null.
when the session hasn't been fetched yet, data will undefined
in case it failed to retrieve the session, data will be null
in case of success, data will be Session.
status: enum mapping to three possible session states: "loading" | "authenticated" | "unauthenticated"
*/
describe('Home page', () => {
	it('should render the home page', () => {
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });
		render(<Home product={{ priceId: 'fake-price-id', amount: '$9.99' }} />);

		expect(screen.getByText('for $9.99 month')).toBeInTheDocument();
	});

	it('should load the subscription price', async () => {
		const stripePricesRetrieveMocked = mocked(stripe.prices.retrieve);
		stripePricesRetrieveMocked.mockResolvedValueOnce({
			// -- use mockResolvedValueOnce...because stripePricesRetrieveMocked is a promise
			id: 'fake-price-id',
			unit_amount: 999,
		} as any);

		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				// -- at least has this object
				props: {
					product: {
						priceId: 'fake-price-id',
						amount: '$9.99',
					},
				},
			})
		);
	});
});
