const Copilot = require('monacopilot');
import { NextResponse } from 'next/server';

const copilot = new Copilot.Copilot(process.env.GROQ_API_KEY, {
    provider: 'groq',
    model: 'llama-3-70b',
});

export async function POST(req) {
    try {
        if(req.method !== 'POST'){
            return NextResponse.error(new Error('Method not allowed'), { status: 405 });
        }
        
        const { completion, error } = await copilot.complete({
            body: await req.json(),
        });

        if (error) {
            return NextResponse.error(new Error(error), { status: 500 });
        }
        return NextResponse.json({ completion }, { status: 200 });
    } catch (error) {
        return NextResponse.error(error);
    }
}