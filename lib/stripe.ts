// Payment Links directos de Stripe (no requieren backend)
const PAYMENT_LINKS: Record<string, string> = {
    'price_1SrkjFDwILF71WLDqTtfV8FD': 'https://buy.stripe.com/test_9B6dR904Rg1M8JdeKI83C02', // monthly
    'price_1SrkkHDwILF71WLDYINz7goR': 'https://buy.stripe.com/test_bJe14nbNz9DogbFeKI83C03', // quarterly
    'price_1Srkl8DwILF71WLD2BVXCKSJ': 'https://buy.stripe.com/test_5kQbJ16tf5n8f7B5a883C04', // biannual
    'price_1SrkmFDwILF71WLDyuT1nXET': 'https://buy.stripe.com/test_aFacN57xj7vggbFeKI83C05', // yearly
};

export const redirectToCheckout = async (priceId: string, _email?: string) => {
    const paymentLink = PAYMENT_LINKS[priceId];

    if (!paymentLink) {
        throw new Error('Invalid price ID');
    }

    window.location.href = paymentLink;
};
