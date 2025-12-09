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
          model: 'claude-haiku-4-5-20251001',
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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are an expert in prompt engineering. Analyze these two AI responses.

CONTEXT:
AI-assisted development is now mainstream. Claude is embedded in coding tools and involved in modern software development. References to "building with Claude" or AI collaboration are standard practice, not edge cases.

ORIGINAL PROMPT:
"${originalPrompt}"

ORIGINAL OUTPUT:
${originalOutput}

---

TRANSFORMED PROMPT:
"${optimizedPrompt}"

TRANSFORMED OUTPUT:
${optimizedOutput}

---

Provide your response in this exact format:

TL;DR:
[In under 60 words, summarize: (1) what the original prompt produced, (2) what the transformed prompt produced, and (3) why the transformed version better enabled the user to steer the AI by summoning specific perspectives]

ANALYSIS:
[2-3 sentences with deeper explanation of which simulator mindset techniques made the difference and how channeling specific perspectives improved the output]`
          }
        ]
      })
    });

    if (!analysisResponse.ok) {
      throw new Error(`Analysis API call failed with status ${analysisResponse.status}`);
    }

    const analysisData = await analysisResponse.json();
    const analysisText = analysisData.content[0].text;

    // Parse TL;DR and analysis
    const tldrMatch = analysisText.match(/TL;DR:\s*([\s\S]*?)(?=ANALYSIS:|$)/i);
    const analysisMatch = analysisText.match(/ANALYSIS:\s*([\s\S]*?)$/i);

    const tldr = tldrMatch ? tldrMatch[1].trim() : '';
    const analysis = analysisMatch ? analysisMatch[1].trim() : analysisText;

    // Return all outputs
    return res.status(200).json({
      originalOutput,
      optimizedOutput,
      tldr,
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
