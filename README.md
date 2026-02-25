# 🖥 Terminal-Themed Developer Portfolio

A Linux terminal-style interactive portfolio website built with Next.js. When someone visits, they feel like they just SSH'd into a developer's machine.

## 🎯 Features

- **Retro Terminal UI** - Authentic terminal window with macOS-style traffic lights
- **Command-Based Navigation** - Navigate using terminal commands
- **Green-on-Black Theme** - Classic terminal aesthetic
- **Smooth Animations** - Blinking cursor and responsive interactions
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **TypeScript Support** - Fully typed for better development experience
- **Command History** - Navigate previous commands with arrow keys

## 🎮 Available Commands

- `help` / `ls` - Display all available commands
- `about` - Learn about me and my background
- `skills` - View my technical skills
- `projects` - Explore my project portfolio
- `experience` - Check my work experience
- `contact` - Get contact information
- `whoami` - Display current user
- `clear` - Clear terminal screen

## 🛠 Tech Stack

- Next.js 16 with TypeScript
- Tailwind CSS
- Fira Code font
- React Hooks

## 📦 Installation

npm install
npm run dev

Open http://localhost:3000

## ✏️ Customization

Edit files in app/data/:
- about.ts
- skills.ts
- projects.ts
- experience.ts
- contact.ts

## 🚀 Deployment to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Deploy

## 📁 Project Structure

```
app/
├── components/
│   ├── Terminal.tsx
│   ├── CommandInput.tsx
│   ├── TerminalWindow.tsx
│   └── Output.tsx
├── data/
│   ├── about.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── experience.ts
│   └── contact.ts
├── layout.tsx
├── page.tsx
└── globals.css
```

Built with ❤️ using Next.js and Tailwind CSS
