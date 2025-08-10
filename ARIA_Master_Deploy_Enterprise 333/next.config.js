module.exports = { reactStrictMode: true, images: { formats: ['image/avif','image/webp'] } }
// package.json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "vercel-build": "npm run build"
  }
}
