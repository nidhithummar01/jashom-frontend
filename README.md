# Jashom AI - Enterprise AI & GPU Solutions Platform

A premium, modern web application showcasing AI development services, CUDA optimization, and GPU acceleration solutions. Built with React, TypeScript, and cutting-edge web technologies.

## Overview

Jashom AI is a comprehensive platform offering enterprise-grade AI solutions, CUDA development services, and GPU optimization expertise. The website features a sophisticated dark theme with neural fusion design elements, smooth animations, and an immersive user experience.

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **SEO**: React Helmet Async
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Notifications**: Sonner

## Key Features

### Pages & Sections

- **Home Page**: Hero section with video background, services overview, portfolio showcase, and statistics
- **Services**: 
  - CUDA Development Services
  - GPU Optimization Services
  - Custom AI Solutions
- **Hire Developers**: Dedicated page for hiring CUDA developers
- **Portfolio**: Showcase of completed projects including:
  - Jashom Healthcare
  - Jashom ICU Connect
  - RAG-LU AI
  - EcoBot AI
  - EnviroPulse
  - GreenSphere
  - ProjectSphere
  - BoostReferral
- **Insights & Blog**: Technical articles and industry insights
- **Careers**: Job listings and application system
- **About Us**: Team information and company overview
- **Contact**: Contact form with modal support

### Design Features

- **Neural Fusion Theme**: Premium dark theme with cyan/blue accent colors
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Page transitions, scroll effects, and micro-interactions
- **Glass Morphism**: Modern glassmorphic UI elements
- **Particle Effects**: Dynamic background particles
- **Cursor Glow**: Interactive cursor effects
- **Magnetic Buttons**: Hover effects on interactive elements

### Technical Features

- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **Type Safe**: Full TypeScript implementation
- **Accessible**: WCAG compliant components
- **Docker Ready**: Containerized deployment setup
- **CI/CD**: Vercel deployment configuration

## Project Structure

```
├── public/
│   ├── images/          # Image assets
│   ├── logos/           # Partner and technology logos
│   ├── videos/          # Background videos
│   └── team-images/     # Team member photos
├── src/
│   ├── components/      # React components
│   │   ├── about/       # About section components
│   │   ├── portfolio/   # Portfolio project pages
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Static data (careers, insights)
│   ├── styles/          # Global styles and color system
│   ├── guidelines/      # Development guidelines
│   └── config/          # Configuration files
├── dist/                # Production build output
└── scripts/             # Build and deployment scripts
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd jashom-ai

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build
```

Build output will be in the `dist/` directory.

## Docker Deployment

```bash
# Build Docker image
docker build -t jashom-ai .

# Run container
docker-compose up
```

## Environment Configuration

The project uses Vite for environment variables. Create a `.env` file in the root.

| Variable | Description |
|----------|-------------|
| `VITE_SITE_URL` | **Frontend site URL** (no trailing slash), e.g. `https://www.jashom.com`. Used for canonical URLs, Open Graph, and structured data. If unset, the app uses the current origin so DevOps can change the domain via env without code changes. |
| `VITE_API_URL` | Backend API base URL (no trailing slash). Used when not using the proxy option. |
| `VITE_USE_API_PROXY` | Set to `true` to use **same-origin proxy (no CORS)**. The app will request `/api/v1/admin/blogs`; your server must proxy `/api` to the backend. |

**Option A – Proxy (no CORS):** Set `VITE_USE_API_PROXY=true` and configure your live server (e.g. nginx) to proxy `/api` to `https://backend.jashom.com`. The browser only talks to your domain, so the backend does not need CORS.

**Option B – Direct API:** Set `VITE_API_URL=https://backend.jashom.com` and allow your frontend origin in the backend’s CORS settings.

## Color System

The project uses a custom neural fusion color palette:

- **Primary**: Cyan/Blue (#00D9FF, #0EA5E9)
- **Secondary**: Purple/Violet (#8B5CF6, #A855F7)
- **Accent**: Electric Blue (#3B82F6)
- **Background**: Deep Dark (#0A0A0F, #0F0F1A)
- **Surface**: Dark Gray (#1A1A2E, #16213E)

## Key Dependencies 

- **UI Framework**: Radix UI for accessible components
- **Styling**: Tailwind CSS with custom configuration
- **Animation**: Motion for smooth transitions
- **Forms**: React Hook Form for form management
- **Routing**: React Router DOM for navigation
- **SEO**: React Helmet Async for meta management
- **Charts**: Recharts for data visualization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Optimized images (WebP format)
- Code splitting and lazy loading
- Efficient bundle size

## Contributing

1. Follow the coding guidelines in `src/guidelines/Guidelines.md`
2. Maintain TypeScript strict mode
3. Use the established color system
4. Ensure responsive design
5. Test across browsers
6. Write semantic HTML

## License

Proprietary - All rights reserved

## Contact

For inquiries, visit the contact page or reach out through the website.

---

Built with ❤️ by the Jashom AI Team
