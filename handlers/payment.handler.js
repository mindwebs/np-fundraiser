const stripe = require("stripe")(String(process.env.STRIPE_SECRET_KEY));
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// amount to be passed in lower currency unit (paise for INR)
const confirmPaymentIntent = async (req, res) => {
    let { amount, name, email, currency } = req.body;
    
    if (currency == 'usd') {
        amount *= 74;
    }
    
    amount *= 100;

    try {
        const customer = await stripe.customers.create({
            name: name,
            email: email,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
            customer: customer.id,
            payment_method_types: ["card"],
            description: "Stripe API Payment",
            receipt_email: email,
        });
        const clientSecret = paymentIntent.client_secret
        res.render('pay', { clientSecret, PUB_KEY: process.env.STRIPE_PUB_KEY })
    } catch (error) {
        // console.log(error)
        res.render('failure', { error })
    }
};

const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            endpointSecret
        );
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    try {
        let paymentIntent = event.data.object;
        const { user_id } = paymentIntent.metadata;
        const email = paymentIntent.receipt_email;
        switch (event.type) {
            case "payment_intent.succeeded":
                // console.log('PaymentIntent was successful!');
                console.log({ user_id, email });

                // Do something with user_id or email if needed, on payment success

                break;
            case "payment_intent.created":
                // console.log('PaymentMethod was attached to a Customer!');
                break;
            case "payment_intent.payment_failed":
                // console.log('PaymentMethod was failed!');
                break;
            case "payment_intent.cancelled":
                // console.log('PaymentMethod was cancelled!');
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        // If database fails log to transactions model - TBD such that it can be later using the status code that came against the transaction_id
        console.error(error);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
};

module.exports = {
    confirmPaymentIntent,
    stripeWebhook,
};
