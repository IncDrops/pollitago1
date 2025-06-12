
import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Ensure your Stripe Secret Key is set in your environment variables
// For local development, set it in .env.local: STRIPE_SECRET_KEY=sk_test_YOUR_KEY
// For deployment, set it in your Firebase App Hosting environment configuration.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("Stripe secret key is not set. Please set STRIPE_SECRET_KEY environment variable.");
  // We don't throw here to allow the server to start, but API calls will fail.
}

// Initialize Stripe with the secret key and a specific API version
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20', // Use the latest API version or one you're tested against
  typescript: true,
}) : null;


export async function POST(request: NextRequest) {
  if (!stripe) {
    console.error('Stripe SDK not initialized because secret key is missing.');
    return NextResponse.json({ error: 'Stripe is not configured on the server.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { amount, recipientId, pollId } = body;

    if (!amount || typeof amount !== 'number' || amount < 100) { // Stripe expects amount in cents, min $1.00 for most cards
      return NextResponse.json({ error: 'Invalid amount. Minimum tip is $1.00 (100 cents).' }, { status: 400 });
    }
    if (!recipientId) {
      return NextResponse.json({ error: 'Missing recipientId' }, { status: 400 });
    }
    if (!pollId) {
      return NextResponse.json({ error: 'Missing pollId' }, { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        recipientId: String(recipientId), // Ensure metadata values are strings
        pollId: String(pollId),
        // You can add more metadata here if needed
      },
      // You could add application_fee_amount here if PollItAGo takes a cut
      // and you are using Stripe Connect with the recipientId as a connected account.
      // For simplicity, we'll assume PollItAGo collects the funds first.
    });

    console.log(`API: Created PaymentIntent ${paymentIntent.id} for poll ${pollId}, recipient ${recipientId}, amount ${amount}`);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error: any) {
    console.error('API /api/tip Error:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Stripe.errors.StripeError) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
