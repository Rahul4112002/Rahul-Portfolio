# 🚀 Rahul Chauhan - Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **AI & Backend Engineer Portfolio** - Showcasing expertise in Generative AI, Machine Learning, and Backend Development

🌐 **Live Website:** [rahul4112.me](https://rahul4112.me)

---

## 📋 About

Modern, responsive portfolio website built with Next.js 16, showcasing my journey as an **AI & Backend Engineer** with 4x Hackathon wins. Features include:

- 🎨 **Interactive Project Showcase** with category-based filtering (AI Agents, Generative AI, Machine Learning, Python)
- 🤖 **AI-Powered Chatbot** using Groq Llama-3.3-70b-versatile
- 🎯 **Admin Panel** for dynamic project management
- ✨ **Smooth Animations** with Framer Motion and custom components
- 📱 **Fully Responsive** design for all devices
- 🌙 **Dark/Light Mode** support

---

## ✨ Features

### 🎯 Core Features
- **Dynamic Project Filtering** - Browse projects by category with smooth horizontal sliders
- **AI Chatbot Integration** - Interactive chatbot for visitor engagement
- **Admin Dashboard** - Manage projects, integrate GitHub repos, and more
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **SEO Optimized** - Meta tags, sitemap, and robots.txt
- **Performance Optimized** - Image optimization, lazy loading, and code splitting

### 🛠️ Technical Highlights
- **Next.js 16** with App Router and React Server Components
- **TypeScript** for type safety
- **Tailwind CSS** with custom animations
- **Appwrite** for backend services
- **Groq AI** for chatbot functionality
- **GitHub Integration** for project syncing
- **Session Management** for admin authentication

---

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16.0.10
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Radix UI, Shadcn/ui
- **Animations:** Framer Motion, Custom CSS

### Backend & Services
- **Backend:** Appwrite (BaaS)
- **AI/ML:** Groq AI (Llama-3.3-70b)
- **APIs:** RESTful APIs with Next.js Route Handlers
- **Analytics:** Vercel Analytics, PostHog

### Developer Tools
- **Version Control:** Git & GitHub
- **Package Manager:** npm/bun
- **Linting:** ESLint
- **Formatting:** Prettier

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ or Bun
- npm/yarn/bun package manager
- Appwrite account (for backend services)
- Groq API key (for AI chatbot)

### Environment Variables
Create a `.env.local` file in the root directory:

```bash
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id

# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key

# Admin Configuration
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/Rahul4112002/Rahul-Portfolio.git
cd Rahul-Portfolio
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Run the development server**
```bash
npm run dev
# or
bun dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── app/              # Next.js 16 App Router
│   │   ├── admin/        # Admin panel pages
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog/Projects page
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── ui/           # UI components
│   │   ├── magicui/      # Custom animated components
│   │   └── admin/        # Admin components
│   ├── data/             # Static data & projects
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript definitions
├── public/               # Static assets
└── scripts/              # Build scripts
```

---

## 🎨 Key Components

### Category-Based Project Filtering
- Dynamic filtering by AI Agents, Generative AI, Machine Learning, and Python
- Horizontal circular slider with smooth scrolling
- Responsive card design with hover effects

### AI Chatbot
- Powered by Groq Llama-3.3-70b-versatile
- Context-aware responses
- SQLite-based chat persistence

### Admin Panel
- Secure session-based authentication
- Project CRUD operations
- GitHub repository integration
- Real-time updates

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rahul4112002/Rahul-Portfolio)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Build for Production

```bash
npm run build
npm run start
```

---

## 📄 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run llms-txt     # Generate llms.txt
npm run llms-full-txt # Generate llms-full.txt
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Rahul4112002/Rahul-Portfolio/issues).

---

## 👨‍💻 Author

**Rahul Chauhan**
- Website: [rahul4112.me](https://rahul4112.me)
- GitHub: [@Rahul4112002](https://github.com/Rahul4112002)
- LinkedIn: [Rahul Chauhan](https://linkedin.com/in/rahul-chauhan-932522230)
- Twitter: [@R4hulChauhan](https://x.com/R4hulChauhan)
- Email: rahulchauhan4708@gmail.com

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Magicui](https://magicui.design/) - Animated Components
- [Appwrite](https://appwrite.io/) - Backend Services
- [Groq](https://groq.com/) - AI Infrastructure
- [Vercel](https://vercel.com/) - Deployment Platform

---

<div align="center">
  <p>⭐ If you like this project, please give it a star on GitHub! ⭐</p>
  <p>Made with ❤️ by Rahul Chauhan</p>
</div>
