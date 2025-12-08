# Prompt Optimizer

A prompt optimization tool that uses the "Simulator Mindset" methodology to transform basic prompts into more effective ones using Claude AI.

## Features

- **Secure API Key Handling**: API keys are stored server-side, never exposed to the client
- **Simulator Mindset Methodology**: Applies advanced prompt engineering techniques
- **Clean UI**: Modern, responsive interface with dark mode design
- **Real-time Optimization**: Get instant feedback on prompt improvements

## Deployment

### Deploy to Vercel

1. **Fork or clone this repository**

2. **Install Vercel CLI** (optional, for local testing):
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**:
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

3. **Run locally with Vercel CLI**:
   ```bash
   vercel dev
   ```

4. **Open in browser**:
   - Navigate to `http://localhost:3000`

## Project Structure

```
prompt-optimizer/
├── index.html          # Main UI
├── api/
│   └── optimize.js     # Serverless function for API calls
├── .env.example        # Environment variable template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## How It Works

1. **Client-side**: User enters a prompt in the web interface
2. **Server-side**: Request is sent to `/api/optimize` serverless function
3. **API Call**: Serverless function calls Anthropic's Claude API with your secure API key
4. **Response**: Optimized prompt is returned and displayed to the user

## Security

- API keys are stored as environment variables on Vercel
- Never committed to version control
- API requests are made server-side only
- Input validation prevents abuse
- Rate limiting handled gracefully

## Technologies

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Vercel Serverless Functions
- **AI**: Anthropic Claude (Sonnet 4)

## License

MIT
