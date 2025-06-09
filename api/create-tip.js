// my-pollitago-app/api/create-tip.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// This function will be triggered by a POST request to /api/create-tip
module.exports = async (req, res) => {
  // Ensure only POST requests are allowed for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // Extract the 'amount' from the request body
  // This is the tip amount your frontend sends
  const { amount } = req.body;

  // Basic validation: ensure amount is a positive number
  if (amount == null || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }

  try {
    // Create a PaymentIntent with the specified amount (in cents) and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure it's an integer
      currency: 'usd',
      // 'automatic_payment_methods' simplifies payment collection on the frontend
      automatic_payment_methods: { enabled: true },
      // You can add more metadata or description here if needed
      description: 'PollItAGo Tip' 
    });

    // Send the client_secret back to the frontend
    // The frontend will use this to confirm the payment
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Handle any errors during the PaymentIntent creation
    console.error('Error creating PaymentIntent:', error.message);
    res.status(500).json({ error: error.message });
  }
};