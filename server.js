// server.js - Node.js Backend for Stripe Payments (PollItAGo Tip Server)

// 1. Import necessary modules
const express = require('express'); // Express.js for creating the web server
const stripe = require('stripe')(process.env.sk_test_51RWVjaGaxRthZIaC36qnF2flLsteDv7pfRsDtkk9f2oLgfPUhkk5IWLDAjQSCBlWDnSfx1X5TvlYdrvzyD1c7kco00LGyWRKV4); 
const cors = require('cors'); // CORS to allow requests from your frontend domain
const dotenv = require('dotenv'); // dotenv to load environment variables from .env file
const path = require('path'); // Node.js path module for resolving file paths
const fs = require('fs'); // Node.js file system module

// 2. Load .env file from the same directory
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('✅ Loaded .env from', envPath);
} else {
  console.log('❌ .env file not found at', envPath);
}

console.log('🔐 Stripe Key (first 4 chars):', process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0,4) + '...' : 'Not Set');


// 3. Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001; // Server will listen on port 3001, or a port defined by the environment

// 4. Middleware
// Enable CORS for all origins (for development). In production, specify your frontend domain.
// Example for production: cors({ origin: 'https://pollitago.com' })
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies from incoming requests

// 5. Basic Test Route (Optional)
app.get('/', (req, res) => {
  res.send('Stripe tip server is running!');
});

// 6. Stripe Payment Intent Route
// This endpoint will be called by your frontend (React app) to create a PaymentIntent.
// A PaymentIntent is an object that represents your intent to collect payment from a customer.
app.post('/create-tip', async (req, res) => {
  // Extract 'amount' from the request body.
  // The amount should be in cents (e.g., $10.00 is 1000 cents).
  const { amount, currency = 'usd' } = req.body; // Default currency to 'usd' if not provided

  // Basic validation (optional but recommended for production)
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }

  try {
    // Create a PaymentIntent with the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,          // Amount in cents
      currency: currency,      // Currency (e.g., 'usd', 'eur')
      metadata: { integration_check: 'accept_a_payment' }, // Optional: useful for tracking
      // Add more options here as needed, e.g., setup_future_usage, confirmation_method, etc.
    });

    // Send the client secret back to the frontend.
    // The client secret is used by the frontend to confirm the payment.
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Handle any errors that occur during PaymentIntent creation
    console.error('Error creating PaymentIntent:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 7. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Stripe tip server running at http://localhost:${PORT}`);
  console.log('Ensure your STRIPE_SECRET_KEY environment variable is set!');
});

