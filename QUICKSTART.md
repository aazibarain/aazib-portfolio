# 🚀 Quick Start Guide

## Your Terminal Portfolio is Ready!

### 1️⃣ Customize Your Info (5 minutes)

Edit these files in `app/data/`:

**about.ts** - Update with your details:
```typescript
export const aboutData = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio...",
  education: [...],
  achievements: [...]
};
```

**skills.ts** - Add your technical skills
**projects.ts** - Add your portfolio projects
**experience.ts** - Add your work experience
**contact.ts** - Add your contact links

### 2️⃣ Test Locally (2 minutes)

```bash
npm run dev
```

Open http://localhost:3000 and test the commands:
- Type `help` to see all commands
- Try `about`, `skills`, `projects`, `experience`, `contact`
- Test `clear` to clear the screen

### 3️⃣ Deploy to Vercel (3 minutes)

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit: terminal portfolio"
git push -u origin main

# Then:
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import your Git repository
# 4. Click "Deploy"
# 5. Get your live URL!
```

### 4️⃣ Share Your Portfolio

- Add link to your resume
- Post on LinkedIn
- Share with friends
- Update your GitHub profile

---

## Available Commands

Users can type these when visiting:

| Command | What It Does |
|---------|------------|
| `help` | Show all commands |
| `ls` | Same as help |
| `about` | Learn about you |
| `skills` | See your skills |
| `projects` | View your projects |
| `experience` | Check your work history |
| `contact` | Get your contact info |
| `whoami` | Show username (aazib) |
| `clear` | Clear the screen |

---

## Useful Commands

```bash
# Development
npm run dev          # Start local server

# Production
npm run build        # Create build
npm start            # Run production build

# Code Quality
npm run lint         # Check code

# Clean up
rm -rf .next         # Clear Next.js cache
```

---

## Customization Tips

### Change Terminal Colors

Edit `app/globals.css`:

```css
:root {
  --background: #0d0d0d;      /* Background */
  --terminal-green: #00ff66;  /* Main text */
  --terminal-accent: #ffcc00; /* Highlights */
  --terminal-error: #ff0033;  /* Errors */
}
```

### Change Font

Edit `app/layout.tsx` - import different Google fonts:

```typescript
import { JetBrains_Mono } from "next/font/google";
// or import { IBM_Plex_Mono } from "next/font/google";
```

---

## File Structure Reference

```
app/
├── components/
│   ├── Terminal.tsx       # Main component
│   ├── TerminalWindow.tsx # Window wrapper
│   ├── CommandInput.tsx   # Input field
│   └── Output.tsx         # Output display
├── data/
│   ├── about.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── experience.ts
│   └── contact.ts
├── globals.css            # Styles
├── layout.tsx             # Layout
└── page.tsx               # Main page
```

---

## Environment Variables

No environment variables needed! This portfolio works out of the box.

---

## Browser Support

Works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## Troubleshooting

**Build fails?**
```bash
rm -rf node_modules
npm install
npm run build
```

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**TypeScript errors?**
```bash
npm run lint -- --fix
```

---

## That's It! 🎉

You now have a stunning terminal-themed portfolio. Go customize it and share it with the world!

👉 Need help? Check SETUP_COMPLETE.md for more details.
