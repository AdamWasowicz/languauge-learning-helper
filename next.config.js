const path = require('path');
const environment = process.env.NODE_ENV;

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: { includePaths: [path.join(__dirname, 'styles')], },
    output: 'standalone'
};


module.exports = nextConfig;