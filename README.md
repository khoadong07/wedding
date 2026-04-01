# Wedding Invitation - Đăng Khoa  &  Thanh Hằng

A modern, responsive wedding invitation website built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **React Intersection Observer** - Scroll-based animations

## ✨ Features

- 📱 **Fully Responsive** - Optimized for all devices
- 🎨 **Modern Design** - Clean, elegant UI with smooth animations
- ⚡ **Performance Optimized** - Fast loading with lazy loading images
- 🖼️ **Interactive Gallery** - Modal gallery with navigation
- 🎭 **Smooth Animations** - Framer Motion powered transitions
- 📧 **SEO Optimized** - Meta tags and Open Graph support
- 🎯 **Accessibility** - WCAG compliant design

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation component
│   ├── Hero.tsx        # Hero section
│   ├── Story.tsx       # Story section
│   ├── Gallery.tsx     # Photo gallery
│   ├── Invitation.tsx  # Invitation section
│   └── Footer.tsx      # Footer component
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🎨 Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

```js
colors: {
  primary: {
    // Your primary color palette
  },
  secondary: {
    // Your secondary color palette
  }
}
```

### Content

Update the content in each component:
- **Hero.tsx** - Names, date, and main message
- **Story.tsx** - Your love story
- **Gallery.tsx** - Wedding photos
- **Invitation.tsx** - Event details

### Images

Replace images in the `assets/` and `optimized/` folders with your own photos.

## 📦 Deployment

### Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Traditional Hosting**: Upload `dist/` contents to your web server

## 🔧 Configuration

### Environment Variables

Create a `.env` file for any environment-specific configuration:

```env
VITE_API_URL=your_api_url
VITE_CONTACT_EMAIL=your_email
```

### Performance

- Images are optimized with WebP format and responsive srcsets
- Code splitting with dynamic imports
- Lazy loading for images and components
- Minimal bundle size with tree shaking

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💝 Credits

Created with love for Đăng Khoa  &  Thanh Hằng's special day.

---

Made with ❤️ using modern web technologies