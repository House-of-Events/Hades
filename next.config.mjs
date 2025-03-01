/** @type {import('next').NextConfig} */
console.log('Loaded NODE_ENV:', process.env.APP_ENV);
const nextConfig = {
  serverExternalPackages: ['knex', 'pg'],
  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      'better-sqlite3',
      'mysql2',
      'oracledb',
      'pg-query-stream',
      'sqlite3',
      'tedious',
    ];
    return config;
  },
};

// Use ES module export syntax for .mjs files
export default nextConfig;
