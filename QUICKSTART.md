# Quick Start Guide

## ⚠️ Important: This App Requires Vercel

This application uses **serverless functions** that only work on Vercel. You cannot simply open `index-slider.html` in your browser.

## 🚀 Getting Started

### Option 1: Deploy to Vercel (Fastest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variable:
   - Variable name: `ANTHROPIC_API_KEY`
   - Value: Your API key from [console.anthropic.com](https://console.anthropic.com/)
5. Click "Deploy"
6. Done! Your app will be live in ~60 seconds

### Option 2: Test Locally

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Create `.env` file** in project root:
   ```bash
   ANTHROPIC_API_KEY=your-api-key-here
   ```

3. **Run development server**:
   ```bash
   vercel dev
   ```

4. **Open browser**:
   - Go to `http://localhost:3000`
   - Try the app!

## 📋 Project Files You Need

Make sure you have these files:

```
your-project/
├── index-slider.html   ← The main UI file
├── api/
│   ├── optimize.js     ← Transform endpoint
│   └── compare.js      ← Comparison endpoint
├── .env                ← Your API key (create this)
└── .env.example        ← Template for .env
```

## 🐛 Common Issues

### "API not available" Error
**Problem**: Opened HTML file directly in browser  
**Solution**: Use `vercel dev` instead

### "ANTHROPIC_API_KEY is not configured"
**Problem**: Missing or wrong API key  
**Solution**: Check your `.env` file or Vercel environment variables

### 404 on /api/optimize
**Problem**: Serverless functions not running  
**Solution**: Make sure `api/` folder exists with `optimize.js` and `compare.js`

## 🔑 Getting an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-api03-...`)
6. Add it to your `.env` file or Vercel environment variables

## 📞 Need Help?

- Check the full [README-SLIDER.md](README-SLIDER.md) for detailed docs
- Make sure all files are in the correct locations
- Verify your API key is valid and has credits
- Try deploying to Vercel if local testing fails

## ✅ Success Checklist

- [ ] Anthropic API key obtained
- [ ] `.env` file created with API key
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Running `vercel dev` (not opening HTML directly)
- [ ] App opens at `http://localhost:3000`
- [ ] Can enter a prompt and click "Transform Prompt"
- [ ] See side-by-side comparison appear

If all boxes are checked, you're good to go! 🎉
