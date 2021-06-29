import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from '../../pages';
import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils'; // -- yarn add ts-jest -D
import { stripe } from '../../services/stripe';

jest.mock('next/router');
// -- check client.d.ts next-auth to see return type of a session
jest.mock('next-auth/client');
jest.mock('../../services/stripe');

describe('Home page', () => {
	it('should render the home page', () => {
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([null, false]);

		render(<Home product={{ priceId: 'fake-price-id', amount: '$9.99' }} />);

		expect(screen.getByText('for $9.99 month')).toBeInTheDocument();
	});

	it('should load the subscription price', async () => {
		const stripePricesRetrieveMocked = mocked(stripe.prices.retrieve);
		stripePricesRetrieveMocked.mockResolvedValueOnce({
			// -- use mockResolvedValueOnce...because stripePricesRetrieveMocked is a promise
			id: 'fake-price-id',
			unit_amount: 1000,
		} as any);

		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				// -- at least has this object
				props: {
					product: {
						priceId: 'fake-price-id',
						amount: '$10.00',
					},
				},
			})
		);
	});
});
