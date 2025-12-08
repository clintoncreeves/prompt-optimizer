export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key is configured
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Validate request body
  const { originalPrompt, optimizedPrompt } = req.body;
  if (!originalPrompt || typeof originalPrompt !== 'string') {
    return res.status(400).json({ error: 'Invalid request: originalPrompt is required' });
  }
  if (!optimizedPrompt || typeof optimizedPrompt !== 'string') {
    return res.status(400).json({ error: 'Invalid request: optimizedPrompt is required' });
  }

  // Validate prompt lengths
  if (originalPrompt.length > 10000 || optimizedPrompt.length > 10000) {
    return res.status(400).json({ error: 'Prompts are too long (max 10000 characters each)' });
  }

  if (originalPrompt.trim().length === 0 || optimizedPrompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompts cannot be empty' });
  }

  try {
    // Helper function to call Claude API
    async function callClaude(prompt) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    }

    // Make both API calls in parallel
    const [originalOutput, optimizedOutput] = await Promise.all([
      callClaude(originalPrompt),
      callClaude(optimizedPrompt)
    ]);

    // Generate comparison analysis
    const analysisResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are an expert in prompt engineering. Compare these two AI responses and explain why the second one is more effective.

ORIGINAL PROMPT:
"${originalPrompt}"

ORIGINAL OUTPUT:
${originalOutput}

---

OPTIMIZED PROMPT:
"${optimizedPrompt}"

OPTIMIZED OUTPUT:
${optimizedOutput}

---

Provide a concise analysis (2-3 sentences) explaining:
1. What makes the optimized prompt's output superior
2. Which specific simulator mindset techniques made the difference
3. How this demonstrates better prompt engineering

Be specific and educational. Focus on teaching the user what improved.`
          }
        ]
      })
    });

    if (!analysisResponse.ok) {
      throw new Error(`Analysis API call failed with status ${analysisResponse.status}`);
    }

    const analysisData = await analysisResponse.json();
    const analysis = analysisData.content[0].text;

    // Return all three outputs
    return res.status(200).json({
      originalOutput,
      optimizedOutput,
      analysis
    });

  } catch (error) {
    console.error('Error in comparison API:', error);

    // Handle rate limiting
    if (error.message.includes('429')) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.'
      });
    }

    // Handle network errors
    if (error.name === 'FetchError' || error.message.includes('fetch')) {
      return res.status(503).json({
        error: 'Unable to connect to API. Please try again.'
      });
    }

    // Generic error handler
    return res.status(500).json({
      error: 'An unexpected error occurred during comparison. Please try again.'
    });
  }
}
