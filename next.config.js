/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/yeswayhome',
  assetPrefix: '/yeswayhome/',
  env: {
    customAssetPath: '/yeswayhome',
  },
  images: {
    loader: 'akamai',
  },
}
