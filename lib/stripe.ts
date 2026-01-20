import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export const redirectToCheckout = async (priceId: string, email?: string) => {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize.');

    const checkoutOptions: any = {
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/`,
    };

    if (email) {
        checkoutOptions.customerEmail = email;
    }

    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    if (error) {
        console.error('Stripe Checkout Error:', error);
        throw error;
    }
};
