/*using stripe sdk on the client side
-- install yarN add @stripe/stripe-js
 */
import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
	const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
	return stripeJs;
}
