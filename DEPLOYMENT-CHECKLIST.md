# Deployment Checklist

## 📋 Pre-Deployment

- [ ] Have an Anthropic API key ready
- [ ] Files are organized in correct structure:
  ```
  project-root/
  ├── index-slider.html
  ├── api/
  │   ├── optimize.js
  │   └── compare.js
  ├── .env.example
  └── .gitignore
  ```
- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] Git repository is clean (no `.env` committed)

## 🚀 Vercel Deployment

### Step 1: Prepare Repository
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is public or you have Vercel access

### Step 2: Import to Vercel
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "Add New Project"
- [ ] Select your repository
- [ ] Click "Import"

### Step 3: Configure Environment
- [ ] Click "Environment Variables"
- [ ] Add variable:
  - Name: `ANTHROPIC_API_KEY`
  - Value: `sk-ant-api03-...` (your actual key)
  - Environments: Production, Preview, Development (all three)
- [ ] Click "Add"

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (usually 30-60 seconds)
- [ ] Build succeeds ✅

### Step 5: Test Production
- [ ] Open deployed URL (e.g., `your-app.vercel.app`)
- [ ] Enter a test prompt
- [ ] Click "Transform Prompt"
- [ ] Verify comparison appears
- [ ] Check "Why It Works" section
- [ ] Test on mobile device

## 🧪 Local Testing (Before Deploy)

### Setup
- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] Created `.env` file with `ANTHROPIC_API_KEY`
- [ ] All files in correct locations

### Testing
- [ ] Run `vercel dev`
- [ ] Server starts without errors
- [ ] Open `http://localhost:3000`
- [ ] Can see the interface
- [ ] Enter prompt: "What do you think about AI?"
- [ ] Click "Transform Prompt"
- [ ] Loading state appears
- [ ] Comparison canvas appears
- [ ] Both outputs are visible
- [ ] "Why It Works" section appears
- [ ] No console errors

## 📱 Cross-Browser Testing

- [ ] Chrome/Edge (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

## ♿ Accessibility Check

- [ ] Can navigate with keyboard (Tab key)
- [ ] Focus states are visible
- [ ] Text is readable (contrast ratios)
- [ ] Works with screen reader (basic test)

## 🐛 Error Handling

Test these scenarios:
- [ ] Empty prompt → Shows focus on input
- [ ] Very long prompt (>10k chars) → Error message
- [ ] Network error → Graceful error display
- [ ] Invalid API key → Error message (during deploy)

## 📊 Performance

- [ ] Page loads in < 3 seconds
- [ ] Transformation completes in < 10 seconds
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts

## 🎨 Visual Check

- [ ] Logo/branding correct
- [ ] Colors match design
- [ ] Typography looks good
- [ ] Spacing is consistent
- [ ] Mobile layout works
- [ ] No horizontal scroll

## 🔒 Security

- [ ] `.env` file in `.gitignore`
- [ ] No API keys in code
- [ ] HTTPS enabled (Vercel does this)
- [ ] Environment variables set in Vercel dashboard

## 📝 Documentation

- [ ] README.md is up to date
- [ ] QUICKSTART.md is clear
- [ ] Links work
- [ ] Examples are accurate

## ✅ Final Checklist

Before announcing/sharing:
- [ ] App works on production URL
- [ ] Mobile experience tested
- [ ] No console errors
- [ ] Error messages are helpful
- [ ] Loading states work
- [ ] Animations are smooth
- [ ] Help overlay works
- [ ] Footer link to @karpathy works
- [ ] Can copy transformed prompts
- [ ] "Why It Works" section is useful

## 🎉 Post-Launch

- [ ] Share on Twitter/X
- [ ] Monitor for errors (Vercel dashboard)
- [ ] Check API usage (Anthropic console)
- [ ] Collect user feedback
- [ ] Note any bugs or improvements

## 📞 Troubleshooting

If something goes wrong:

1. **Check Vercel Logs**
   - Go to Vercel dashboard
   - Click on your project
   - Click "Logs"
   - Look for errors

2. **Check Environment Variables**
   - Vercel dashboard → Settings → Environment Variables
   - Verify `ANTHROPIC_API_KEY` is set for all environments

3. **Redeploy**
   - Vercel dashboard → Deployments
   - Click "Redeploy" on latest deployment

4. **Test API Key**
   - Go to [console.anthropic.com](https://console.anthropic.com/)
   - Verify key is active
   - Check usage limits

5. **Check File Structure**
   - Make sure `api/optimize.js` and `api/compare.js` exist
   - Verify they're in the `api/` folder at root level

## 🎯 Success Metrics

Your deployment is successful if:
- ✅ App loads without errors
- ✅ Can transform prompts
- ✅ Comparison appears correctly
- ✅ Works on mobile
- ✅ No errors in console
- ✅ Loading states work
- ✅ Animations are smooth

---

**Ready to deploy?** Start with the Pre-Deployment section and work through each checklist!
