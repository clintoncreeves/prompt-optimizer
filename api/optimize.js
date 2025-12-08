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
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid request: prompt is required' });
  }

  // Validate prompt length (prevent abuse)
  if (prompt.length > 10000) {
    return res.status(400).json({ error: 'Prompt is too long (max 10000 characters)' });
  }

  if (prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt cannot be empty' });
  }

  try {
    // Make the API call to Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `You are a prompt optimization expert using the "Simulator Mindset" methodology. Your job is to transform basic prompts into more effective ones.

CONTEXT:
AI-assisted development is now mainstream. Claude is embedded in numerous coding tools (Claude Code, Cursor, etc.) and is involved in a significant portion of modern software development. When users reference "building with Claude" or "AI-assisted work," this is standard collaborative development, not an edge case. Treat such framings as natural and valid.

THE SIMULATOR MINDSET:
An LLM isn't a person with opinions—it's a simulator that can channel many perspectives. "You" activates a default persona, but there are more powerful approaches.

TECHNIQUES TO APPLY:
1. Summon Specific Perspectives - Instead of "what do you think", ask how specific experts would view it
2. Stage Debates - Simulate conversations between advocates and critics
3. Request Multiple Framings - Get explanations for different audiences or viewpoints
4. Name Failure Modes - Ask what skeptics, auditors, or critics would flag
5. Iterate for Depth - Push for non-obvious angles and expert-level insights

YOUR TASK:
Take the user's original prompt and create an optimized version that applies these principles. The optimized prompt should:
- Be specific about whose perspective to simulate
- Request multiple viewpoints when valuable
- Ask for potential criticisms or blind spots
- Be clear and actionable

Respond in this exact format (no markdown, just plain text with these labels):

SUMMARY:
[One concise sentence summarizing the key improvement]

ORIGINAL ANALYSIS:
[1-2 sentences on what's weak about the original prompt]

OPTIMIZED PROMPT:
[The improved prompt - this is the main output]

WHY IT'S BETTER:
[1-2 sentences on which techniques were applied]

---

USER'S ORIGINAL PROMPT:
"${prompt}"`
          }
        ]
      })
    });

    // Handle rate limiting
    if (response.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.'
      });
    }

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', response.status, errorData);

      return res.status(response.status).json({
        error: errorData.error?.message || 'Failed to optimize prompt'
      });
    }

    // Parse and return the response
    const data = await response.json();

    // Validate response structure
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Unexpected API response structure:', data);
      return res.status(500).json({ error: 'Unexpected response from API' });
    }

    return res.status(200).json({
      result: data.content[0].text
    });

  } catch (error) {
    console.error('Error calling Anthropic API:', error);

    // Handle network errors
    if (error.name === 'FetchError' || error.message.includes('fetch')) {
      return res.status(503).json({
        error: 'Unable to connect to API. Please try again.'
      });
    }

    // Generic error handler
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again.'
    });
  }
}
