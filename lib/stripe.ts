export const redirectToCheckout = async (priceId: string, email?: string) => {
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

    const { url } = data;

    if (!url) {
        throw new Error('No checkout URL returned from Stripe');
    }

    // Redirect to Stripe Checkout page
    window.location.href = url;
};
