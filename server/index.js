import express from 'express';
import Stripe from 'stripe';

const app = express();
const port = 8000;

const SECRET_KEY = "SECRET_KEY";

const stripe = Stripe(SECRET_KEY, {apiVersion: "2022-11-15"});

app.listen(port, () => {
    console.log(`server http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create
        
        ({
            amount: 1999,
            currency: 'usd',
            payment_method_types: ["card"],
        });
        const clientSecret = paymentIntent.client_secret

        res.json({
            clientSecret: clientSecret,
        })

    }catch (e) {
        console.log(e.message);
        res.json({error: e.message})
    }
})
