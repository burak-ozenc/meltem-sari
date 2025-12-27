# Meltem Sari Portfolio - Frontend

Modern, minimalist photography portfolio built with React + Vite and Sanity CMS.

## Features

- ✨ Clean, editorial design with IBM Plex Mono typography
- 📱 Fully responsive
- 🎨 Smooth animations and transitions
- 🖼️ Photo series galleries
- 📝 Dynamic content from Sanity CMS
- ⚡ Fast performance with Vite

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Sanity Client** - Content management
- **CSS3** - Styling

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Sanity

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your Sanity project ID:
```
VITE_SANITY_PROJECT_ID=your-actual-project-id
VITE_SANITY_DATASET=production
```

3. Also update the project ID in `src/lib/sanity.js`

### 3. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Deploy to Vercel (Free)

### Option 1: Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set the root directory to `frontend`
6. Add environment variables:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
7. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

Your site will be live at: `your-project.vercel.app`

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   └── Layout.jsx   # Main layout with navigation
│   ├── pages/          # Page components
│   │   ├── Home.jsx    # Landing page with video
│   │   ├── Works.jsx   # Photo series grid
│   │   ├── SeriesDetail.jsx  # Individual series
│   │   ├── Exhibitions.jsx
│   │   ├── Press.jsx
│   │   ├── Biography.jsx
│   │   └── Contact.jsx
│   ├── lib/            # Utilities
│   │   └── sanity.js   # Sanity client
│   ├── styles/         # Global styles
│   │   └── global.css
│   ├── App.jsx         # Main app with routing
│   └── main.jsx        # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Adding Video

1. Place your intro video in `public/sample-video.mp4`
2. The video will autoplay on the homepage
3. Recommended specs:
   - Duration: 10-15 seconds
   - Format: MP4 (H.264)
   - Resolution: 1920x1080 or higher
   - File size: < 10MB (compress if needed)

## Customization

### Colors

Edit in `src/styles/global.css`:
```css
:root {
  --bg-color: #F4F2EE;
  --heading-color: #2A2F4F;
  --text-color: #1C1C1C;
}
```

### Typography

The site uses IBM Plex Mono from Google Fonts. To change:
1. Update the font link in `index.html`
2. Update `--font-mono` in `global.css`

## Performance

- Images are lazy-loaded
- Sanity CDN for optimized image delivery
- Smooth animations with CSS
- Minimal JavaScript bundle

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

**Issue: Images not loading**
- Check that your Sanity project ID is correct
- Verify the dataset name is "production"
- Make sure images are uploaded in Sanity Studio

**Issue: Routes not working after deployment**
- Vercel handles this automatically for SPA
- Make sure you're using Vercel for deployment

**Issue: Slow loading**
- Check network tab for large assets
- Compress video file if > 10MB
- Use Sanity's image optimization parameters

## Support

For issues or questions, contact: sarimeltem@yahoo.com
