// backend/create-tip.js
const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // secret key in your Vercel env

app.post('/create-tip', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'PollItAGo Tip Jar' },
          unit_amount: amount,
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'https://yourdomain.com/success',
      cancel_url: 'https://yourdomain.com/cancel'
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// If running locally:
app.listen(4242, () => console.log('Stripe server running on port 4242'));
