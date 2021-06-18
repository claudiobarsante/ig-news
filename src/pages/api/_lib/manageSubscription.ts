import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
	subscriptionId: string,
	customerId: string,
	createAction = false
) {
	console.log('save ==', subscriptionId, customerId);
	// -- find user in FaunaDB with stripe customerId
	// -- 'ref' is the userId in FaunaDB 'users' collection
	const userFaunaRef = await fauna.query(
		q.Select('ref', q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)))
	);
	// -- save subscription info FaunaDB
	const subscription = await stripe.subscriptions.retrieve(subscriptionId);

	const subscriptionData = {
		id: subscription.id,
		userId: userFaunaRef,
		status: subscription.status,
		price_id: subscription.items.data[0].price.id, // this is the subscription code from stripe
	};

	if (createAction) {
		await fauna.query(q.Create(q.Collection('subscriptions'), { data: subscriptionData }));
	} else {
		await fauna.query(
			q.Replace(q.Select('ref', q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))), {
				data: subscriptionData,
			})
		);
	}
}
