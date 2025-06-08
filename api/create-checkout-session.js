// api/create-checkout-session.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'PollItAGo Tip',
            },
            unit_amount: 500, // $5.00 tip
          },
          quantity: 1,
        },
      ],
      success_url: 'https://pollitago.vercel.app/success',
      cancel_url: 'https://pollitago.vercel.app/cancel',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
