const Copilot = require('monacopilot');

const copilot = new Copilot.Copilot(process.env.NEXT_PUBLIC_GROQ_API_KEY, {
    provider: 'groq',
    model: 'llama-3-70b',
});

export default async function handler(req, res) {
    console.log("handler")
    try {
        if(req.method !== 'POST') res.status(405).end();
        
        const { completion, error } = await copilot.complete({
            body: req.body,
        });

        if (error) {
            res.status(500).json({ completion: null, error });
        }
        res.status(200).json({ completion });
        
    } catch (error) {
        return res.status(500).json({ error: 'Error' });
    }
}