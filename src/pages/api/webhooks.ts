import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from './../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';
//import { buffer } from 'micro';
// -- to transform streaming from stripe to string
async function buffer(readable: Readable) {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks);
}

// -- https://nextjs.org/docs/api-routes/api-middlewares
// -- bodyParser Enables body parsing, you can disable it if you want to consume it as a Stream:
// -- the default config on Next it's json
export const config = {
	api: {
		bodyParser: false,
	},
};
const relevantEvents = new Set([
	'checkout.session.completed',
	'customer.subscription.updated',
	'customer.subscription.deleted',
]);

// -- to start listening= stripe listen --forward-to localhost:3000/api/webhooks
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const requestBuffer = await buffer(req);
		// -- Check if the event has the secret key from stripe
		const secret = req.headers['stripe-signature'] as string;

		let event: Stripe.Event; // -- generic event type

		try {
			event = stripe.webhooks.constructEvent(
				requestBuffer.toString(),
				secret,
				process.env.STRIPE_WEBHOOKS_SECRET.toString()
			);
		} catch (error) {
			return res
				.status(400)
				.send(
					`Webhook error: ${error.message}, secret ${secret}, buff ${requestBuffer} ,var ${process.env.STRIPE_WEBHOOKS_SECRET}`
				);
		}
		const { type } = event;
		console.log('event', event);
		if (relevantEvents.has(type)) {
			try {
				switch (type) {
					case 'customer.subscription.updated':
					case 'customer.subscription.deleted':
						const subscription = event.data.object as Stripe.Subscription;

						await saveSubscription(subscription.id, subscription.customer.toString(), false);
						break;
					case 'checkout.session.completed':
						// --typing checkoutSession as type Stripe.Checkout.Session to know what properties are inside it
						const checkoutSession = event.data.object as Stripe.Checkout.Session;
						await saveSubscription(
							checkoutSession.subscription.toString(),
							checkoutSession.customer.toString(),
							true
						);
						break;
					default:
						throw new Error('Unhandled event');
				}
			} catch (err) {
				return res.json({ error: 'Webhook handler failed' });
			}
		}

		res.status(200).json({ received: true });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method not allowed');
	}
};
