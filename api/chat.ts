import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Gemini client
const apiKey = process.env.GEMINI_API_KEY;
// Note: We'll initialize the client inside the handler or globally if the SDK supports it.
// The new @google/genai might have a different surface, but let's assume standard usage or check docs if this fails.
// Checking package.json, it has @google/genai.
// Let's use standard fetch API for the handler.

// export const config = {
//   runtime: 'edge', // Using Node.js runtime for better compatibility with @google/genai
// };

export default async function handler(req: Request) {
    // 1. Authenticate the user
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized', details: authError?.message }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 2. Parse request body
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
        return new Response(JSON.stringify({ error: 'Messages array is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 3. Call Gemini API
    try {
        // Check if we have the API Key
        if (!apiKey) {
            throw new Error("Missing GEMINI_API_KEY");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Convert messages to Gemini format if necessary, or just pass the last prompt
        // Assuming simplistic chat for now:
        const lastMessage = messages[messages.length - 1];
        const prompt = lastMessage.content;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ role: 'assistant', content: text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Gemini API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
