# The Simulator Mindset

A tool that helps you apply Andrej Karpathy's "simulator mindset" to transform how you prompt LLMs. Stop asking "you" for opinions—start channeling specific perspectives.

## The Core Insight

As [@karpathy pointed out](https://x.com/karpathy/status/1997731268969304070), an LLM isn't a person with opinions—it's a simulator that can channel *any* perspective. Instead of activating the default "helpful assistant" persona, you can summon the specific expertise you need.

This tool takes your basic prompts and transforms them to leverage this insight.

## Features

- **Simulator Mindset Application**: Transforms prompts to summon specific perspectives instead of generic responses
- **Secure API Key Handling**: API keys are stored server-side, never exposed to the client
- **Live Comparison**: See how your original vs transformed prompts perform side-by-side
- **Clean, Modern UI**: Beautiful dark interface with smooth animations
- **Instant Results**: Get real-time transformations powered by Claude AI

## Deployment

### Deploy to Vercel

1. **Fork or clone this repository**

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import this repository
   - Add environment variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com/)
   - Deploy!

### Local Development

1. **Get an Anthropic API key**:
   - Sign up at [console.anthropic.com](https://console.anthropic.com/)
   - Create an API key

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Install Vercel CLI** (for local testing):
   ```bash
   npm install -g vercel
   ```

4. **Run locally with Vercel CLI**:
   ```bash
   vercel dev
   ```

5. **Open in browser**:
   - Navigate to `http://localhost:3000`

## Project Structure

```
simulator-mindset/
├── index.html          # Main UI
├── api/
│   ├── optimize.js     # Serverless function for prompt transformation
│   └── compare.js      # Serverless function for output comparison
├── .env.example        # Environment variable template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## How It Works

1. **Client-side**: User enters a basic prompt in the web interface
2. **Server-side**: Request is sent to `/api/optimize` serverless function
3. **Transformation**: Claude applies simulator mindset principles to summon specific perspectives
4. **Comparison**: Both the original and transformed prompts are executed
5. **Analysis**: Results are compared to show the improvement
6. **Response**: Transformed prompt and comparison are displayed to the user

### The Techniques Applied

- **Summon Perspectives**: Replace "what do you think" with "how would [specific expert] view this"
- **Stage Debates**: Request multiple viewpoints (advocates vs critics)
- **Multiple Framings**: Ask for explanations targeted at different audiences
- **Name Failure Modes**: Explicitly request potential criticisms or blind spots
- **Iterate for Depth**: Push for non-obvious angles and expert-level insights

## Security

- API keys are stored as environment variables on Vercel
- Never committed to version control
- API requests are made server-side only
- Input validation prevents abuse
- Rate limiting handled gracefully

## Technologies

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Vercel Serverless Functions
- **AI**: Anthropic Claude (Haiku 4.5)

## Credits

This tool is inspired by [Andrej Karpathy's tweet](https://x.com/karpathy/status/1997731268969304070) about the simulator mindset - the insight that LLMs are simulators, not oracles with opinions. By framing prompts to summon specific perspectives, you get dramatically better results.

## License

MIT
