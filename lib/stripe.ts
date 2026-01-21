import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export const redirectToCheckout = async (priceId: string, email?: string) => {
    // Call the backend to create a session
    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, email }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Network response was not ok');
    }

    const { sessionId } = data;

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize.');

    const { error } = await stripe.redirectToCheckout({
        sessionId,
    });

    if (error) {
        console.error('Stripe Checkout Error:', error);
        throw error;
    }
};
