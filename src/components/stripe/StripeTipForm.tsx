
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

interface StripeTipFormProps {
  initialTipAmount: string;
  creatorName: string;
  pollId: string;
  onCancel: () => void;
  onSuccessfulTip: () => void;
}

const CheckoutForm: React.FC<StripeTipFormProps> = ({
  initialTipAmount,
  creatorName,
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

    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name: `Tipper for ${creatorName} (Poll: ${pollId})` },
      });

      if (paymentMethodError) {
        throw paymentMethodError;
      }

      console.log('Stripe PaymentMethod ID:', paymentMethod.id);
      console.log(`Simulating tip of $${tipAmount} to ${creatorName} for poll ${pollId}. Backend processing required.`);
      
      // In a real app, you would now send paymentMethod.id and tipAmount
      // to your backend to create a PaymentIntent and confirm the payment.

      toast({
        title: 'Tip Successful! (Simulated)',
        description: `You've tipped ${creatorName} $${tipAmount}. Thank you!`,
      });
      setIsProcessing(false);
      onSuccessfulTip();
    } catch (e) {
      const stripeError = e as StripeError;
      setError(stripeError.message || 'An unexpected error occurred during payment.');
      toast({
        title: 'Payment Error',
        description: stripeError.message || 'Could not process payment. Please check your card details.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: 'hsl(var(--foreground))', // Adapts to theme
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
          min="1.00" // Stripe typically has minimum transaction amounts (e.g., $0.50 or $1.00)
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

export const StripeTipFormWrapper: React.FC<StripeTipFormProps> = (props) => {
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
      <CheckoutForm {...props} />
    </Elements>
  );
};
