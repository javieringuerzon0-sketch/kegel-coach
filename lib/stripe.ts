import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export const redirectToCheckout = async (priceId: string, email: string) => {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize.');

    const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/`,
        customerEmail: email, // Pre-fill email in checkout
    });

    if (error) {
        console.error('Stripe Checkout Error:', error);
        throw error;
    }
};
