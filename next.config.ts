// next.config.ts  shoukd like this to more secure
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;

//This config tells Next.js:"I trust images from The Movie Database CDN"

//protocol: "https" → only secure requests
//hostname: "image.tmdb.org" → only TMDb
//pathname: "/t/p/**" → only image paths

//Next.js blocks external images by default for security.unless give it ur pattern