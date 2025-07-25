/** @type {import('next').NextConfig} */
console.log('Loaded NODE_ENV:', process.env.APP_ENV);

const nextConfig = {
  images: {
    domains: [
      'i.pinimg.com',
      'in.pinterest.com',
      'images.unsplash.com',
      'picsum.photos',
      'via.placeholder.com'
    ],
  },
};

// Use ES module export syntax for .mjs files
export default nextConfig;
