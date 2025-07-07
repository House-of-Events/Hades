/** @type {import('next').NextConfig} */
console.log('Loaded NODE_ENV:', process.env.APP_ENV);

const nextConfig = {
  images: {
    domains: ['i.pinimg.com'], // Add this line
  },
};

// Use ES module export syntax for .mjs files
export default nextConfig;
