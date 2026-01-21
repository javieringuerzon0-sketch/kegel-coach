import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        return res.status(500).json({ error: 'Stripe is not configured' });
    }

    const stripe = new Stripe(secretKey, {
        timeout: 10000,
        maxNetworkRetries: 0,
    });

    const { priceId, email } = req.body;

    if (!priceId) {
        return res.status(400).json({ error: 'priceId is required' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: 'https://kegelcoach.vercel.app/?success=true',
            cancel_url: 'https://kegelcoach.vercel.app/',
            customer_email: email || undefined,
        });

        return res.status(200).json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Error:', error?.message);
        return res.status(500).json({ error: error?.message || 'Checkout failed' });
    }
}
