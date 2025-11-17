# Top Tier Restoration

Professional home restoration and remodeling services website for Top Tier Restoration.

## 🏠 About

Top Tier Restoration is a full-service restoration company specializing in:
- Water Damage Restoration
- Fire Damage Restoration
- Storm Damage Repair
- Complete Remodeling Services

## 🚀 Features

- **Modern React Application** - Built with React 18, TypeScript, and Vite
- **Headless CMS** - Sanity CMS for easy content management
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Project Gallery** - Dynamic project showcase with detail pages
- **Blog System** - Content management for blog posts
- **Contact Form** - Integrated email service via Resend
- **Auto-Deployment** - Automatic Vercel deployment on content publish

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **CMS**: Sanity v4
- **Routing**: React Router v6
- **Email**: Resend API
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 20+ and npm
- Sanity account (for CMS)
- Resend account (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TTR
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   VITE_SANITY_PREVIEW_SECRET=your_preview_secret
   VITE_SANITY_PREVIEW_TOKEN=your_preview_token
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Website will be available at: http://localhost:8080

5. **Start Sanity Studio** (in a separate terminal)
   ```bash
   npm run sanity:dev
   ```
   Studio will be available at: http://localhost:3333/studio

## 📝 Content Management

Content is managed through Sanity Studio. Access it at `/studio` when running locally or deploy it separately.

### Adding Content

- **Projects**: Create restoration projects with images, videos, and descriptions
- **Blog Posts**: Write blog posts with rich text content
- **Categories**: Organize projects by category (Water Damage, Fire Damage, etc.)

## 🚢 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Sanity Studio Deployment

Deploy the studio separately:
```bash
npm run sanity:deploy
```

## 📁 Project Structure

```
TTR/
├── api/              # Vercel serverless functions
├── sanity/           # Sanity CMS configuration
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── lib/          # Utilities and Sanity client
│   └── types/        # TypeScript types
└── public/           # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run sanity:dev` - Start Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio
- `npm run lint` - Run ESLint

## 📄 License

All rights reserved. Top Tier Restoration © 2024

## 🤝 Support

For questions or support, contact the development team.
