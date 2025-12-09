# The Simulator Mindset (Before/After Slider Design)

A tool that helps you apply Andrej Karpathy's "simulator mindset" to transform how you prompt LLMs. Stop asking "you" for opinions—start channeling specific perspectives.

## 🎨 New Design Features

### Before/After Slider Canvas
- **Side-by-side comparison** - See original vs transformed prompts and outputs simultaneously
- **No scrolling required** - Everything in one unified view
- **Visual comparison** - Red (generic) vs Green (simulator mindset) color coding
- **Draggable slider** (desktop) - Interact with the comparison
- **Mobile responsive** - Stacks vertically on smaller screens

### Enhanced UX
- **Toggle-able Core Principles** - Access help without blocking workflow (? button)
- **Contextual "Why It Works"** - Collapsible explanation section that auto-generates
- **Highlight animations** - Subtle visual cues showing what changed
- **Perspective badges** - Clear indication of which "mode" is active

## The Core Insight

As [@karpathy pointed out](https://x.com/karpathy/status/1997731268969304070), an LLM isn't a person with opinions—it's a simulator that can channel *any* perspective. Instead of activating the default "helpful assistant" persona, you can summon the specific expertise you need.

This tool takes your basic prompts and transforms them to leverage this insight.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

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

**Important**: This app requires serverless functions to work. You must use Vercel's development environment.

1. **Get an Anthropic API key**:
   - Sign up at [console.anthropic.com](https://console.anthropic.com/)
   - Create an API key

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

4. **Run locally with Vercel CLI**:
   ```bash
   vercel dev
   ```

5. **Open in browser**:
   - Navigate to `http://localhost:3000`
   - The app will NOT work if you just open `index-slider.html` directly in a browser
   - You MUST use `vercel dev` for the API routes to work

## 📁 Project Structure

```
simulator-mindset/
├── index-slider.html   # New Before/After Slider UI
├── index.html          # Original vertical layout (preserved)
├── api/
│   ├── optimize.js     # Serverless function for prompt transformation
│   └── compare.js      # Serverless function for output comparison
├── .env.example        # Environment variable template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎯 How It Works

1. **Enter your prompt** - Type any prompt in the input field
2. **Click Transform** - The tool applies simulator mindset principles
3. **Compare side-by-side** - See original vs transformed prompts and outputs
4. **Learn why it works** - Read the contextual explanation below
5. **Iterate** - Try different prompts to internalize the concept

### The Techniques Applied

- **Summon Perspectives**: Replace "what do you think" with "how would [specific expert] view this"
- **Stage Debates**: Request multiple viewpoints (advocates vs critics)
- **Multiple Framings**: Ask for explanations targeted at different audiences
- **Name Failure Modes**: Explicitly request potential criticisms or blind spots
- **Iterate for Depth**: Push for non-obvious angles and expert-level insights

## 🎨 Design Philosophy

This redesign implements feedback from a design council review:

1. **One unified canvas** - No scrolling between cards
2. **Immediate comparison** - Side-by-side is clearer than vertical
3. **Optional education** - Core principles don't block the workflow
4. **Visual feedback** - Color coding and animations show transformation
5. **Mobile-first** - Works beautifully on all screen sizes

## 🐛 Troubleshooting

### "API not available" Error
- **Cause**: You're opening the HTML file directly in a browser
- **Fix**: Use `vercel dev` to run the app with serverless functions

### "Failed to transform prompt" Error
- **Cause**: Missing or invalid `ANTHROPIC_API_KEY`
- **Fix**: Check your `.env` file has the correct API key

### Slider not working
- **Cause**: This is expected on mobile devices
- **Fix**: The slider is desktop-only; mobile users see a stacked layout

## 🔐 Security

- API keys are stored as environment variables on Vercel
- Never committed to version control
- API requests are made server-side only
- Input validation prevents abuse
- Rate limiting handled gracefully

## 💻 Technologies

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Anthropic Claude (Haiku 4.5 & Sonnet 4.5)
- **Fonts**: Fraunces, Karla, Space Mono (Google Fonts)

## 📊 Design Iterations

### v2.0 - Before/After Slider (Current)
- Side-by-side comparison canvas
- Toggle-able help overlay
- Contextual explanations
- Reduced cognitive load

### v1.0 - Vertical Cards (Preserved in `index.html`)
- Three vertical cards
- Always-visible principles box
- Sequential workflow

## 🙏 Credits

This tool is inspired by [Andrej Karpathy's tweet](https://x.com/karpathy/status/1997731268969304070) about the simulator mindset - the insight that LLMs are simulators, not oracles with opinions. By framing prompts to summon specific perspectives, you get dramatically better results.

Design implementation guided by principles from top design firms including Apple, Stripe, and Vercel's design teams.

## 📄 License

MIT
