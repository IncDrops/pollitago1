// src/server/stripe.ts

import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next'; // Assuming you are using Next.js API routes

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20', // Use your desired API version
});

// API route handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method === 'POST') {
    try {
      // Extract line items from the request body
      const { line_items } = req.body;

      // Validate line items
      if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
        return res.status(400).json({ error: 'Invalid line items provided' });
      }

      // Create a Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], // Specify payment methods
        line_items: line_items, // Add the line items
        mode: 'payment', // Set the payment mode (e.g., 'payment', 'subscription')
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect URL on success
        cancel_url: `${req.headers.origin}/cancel`, // Redirect URL on cancel
      });

      // Respond with the checkout session URL
      res.status(200).json({ url: session.url });
    } catch (error: any) {
      // Handle errors
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Method Not Allowed for other request methods
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
