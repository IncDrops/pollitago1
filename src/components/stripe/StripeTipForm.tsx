
'use client';

import { useState, type FormEvent } from 'react';
import { loadStripe, type StripeError } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { DialogFooter } from '@/components/ui/dialog';

// Initialize Stripe.js with your publishable key
// IMPORTANT: For this to work, create a .env.local file in your project root
// and add your Stripe publishable key like this:
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
// Replace pk_test_YOUR_STRIPE_PUBLISHABLE_KEY with your actual key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '' // Fallback to empty string if not set
);

export interface StripeTipFormWrapperProps {
  initialTipAmount: string;
  creatorName: string;
  // recipientId would typically be the creator's user ID or their Stripe Connect account ID
  // For this placeholder, we'll use it to simulate sending to a backend.
  recipientId: string; 
  pollId: string;
  onCancel: () => void;
  onSuccessfulTip: () => void;
}

const CheckoutForm: React.FC<StripeTipFormWrapperProps> = ({
  initialTipAmount,
  creatorName,
  recipientId,
  pollId,
  onCancel,
  onSuccessfulTip,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [tipAmount, setTipAmount] = useState(initialTipAmount);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet. Please try again in a moment.');
      toast({ title: 'Error', description: 'Stripe.js has not loaded.', variant: 'destructive' });
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card details component not found. Please ensure the card form is visible.');
      toast({ title: 'Error', description: 'Card details component not found.', variant: 'destructive' });
      setIsProcessing(false);
      return;
    }

    const numericTipAmount = parseFloat(tipAmount);
    if (isNaN(numericTipAmount) || numericTipAmount < 1.00) {
        setError('Minimum tip amount is $1.00.');
        toast({ title: 'Invalid Amount', description: 'Minimum tip amount is $1.00.', variant: 'destructive' });
        setIsProcessing(false);
        return;
    }
    const amountInSmallestUnit = Math.round(numericTipAmount * 100);


    try {
      // 1. Create a PaymentMethod (optional, can be done during payment confirmation)
      //    This step isn't strictly necessary if you're confirming immediately,
      //    but it's good for understanding the flow.
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name: `Tipper for ${creatorName} (Poll: ${pollId})` },
      });

      if (paymentMethodError) {
        throw paymentMethodError; // This will be caught by the catch block
      }

      // 2. Call your backend to create a PaymentIntent and get its client_secret
      const response = await fetch('/api/tip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInSmallestUnit, // Send amount in cents
          recipientId: recipientId, 
          pollId: pollId,
          // paymentMethodId: paymentMethod.id // You could send this if your backend uses it
        }),
      });

      const paymentIntentData = await response.json();

      if (!response.ok || paymentIntentData.error) {
        throw new Error(paymentIntentData.error || 'Failed to initialize payment.');
      }

      if (!paymentIntentData.clientSecret) {
        throw new Error('Client secret not received from server.');
      }
      
      // 3. Confirm the card payment with the client_secret from your backend
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret, 
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `Tipper for ${creatorName} (Poll ID: ${pollId})`,
            },
          },
        }
      );

      if (confirmError) {
        throw confirmError; // This will be caught by the catch block
      }
      
      // PaymentIntent successful! (or requires action)
      if (paymentIntent?.status === 'succeeded') {
        toast({ title: 'Tip Successful!', description: `You've tipped ${creatorName} $${numericTipAmount.toFixed(2)}. Thank you!` });
        onSuccessfulTip();
      } else if (paymentIntent?.status === 'requires_action' || paymentIntent?.status === 'requires_confirmation') {
         setError('Further action is needed to complete this payment. Please follow the prompts.');
         toast({ title: 'Payment Incomplete', description: 'Further action or confirmation is required.', variant: 'destructive'});
      } else {
        setError(`Payment status: ${paymentIntent?.status || 'unknown'}. Please try again.`);
        toast({ title: 'Payment Unsuccessful', description: `Payment status: ${paymentIntent?.status || 'unknown'}.`, variant: 'destructive'});
      }

    } catch (e: any) { // Catches StripeError or other errors
      const errorMessage = e.message || 'An unexpected error occurred during payment.';
      setError(errorMessage);
      toast({
        title: 'Payment Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: 'hsl(var(--foreground))', 
        '::placeholder': { color: 'hsl(var(--muted-foreground))' },
        fontFamily: 'Inter, sans-serif', 
      },
      invalid: {
        color: 'hsl(var(--destructive))',
        iconColor: 'hsl(var(--destructive))',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`tipAmount-stripe-${pollId}`} className="text-right">
          Amount
        </Label>
        <Input
          id={`tipAmount-stripe-${pollId}`}
          type="number"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          placeholder="5.00"
          step="0.01"
          min="1.00" 
          className="col-span-3"
          disabled={isProcessing}
          required
        />
      </div>
      <div className="p-3 border rounded-md bg-transparent focus-within:ring-2 focus-within:ring-ring">
        <CardElement options={cardElementOptions} />
      </div>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
      <DialogFooter className="pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe || isProcessing || parseFloat(tipAmount) < 1}>
          {isProcessing ? 'Processing...' : `Confirm Tip $${parseFloat(tipAmount || '0').toFixed(2)}`}
        </Button>
      </DialogFooter>
    </form>
  );
};

export const StripeTipFormWrapper: React.FC<StripeTipFormWrapperProps> = (props) => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    console.error("Stripe publishable key is not set. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env.local file.");
    return (
      <div className="p-4 text-destructive text-center space-y-4">
        <p>Stripe is not configured correctly.</p>
        <p className="text-xs text-muted-foreground">Missing publishable API key. Please contact support or check server logs.</p>
         <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={props.onCancel}>
            Close
            </Button>
        </DialogFooter>
      </div>
    );
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} recipientId={props.poll.creator.id} />
    </Elements>
  );
};
