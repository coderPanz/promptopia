/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 这个属性告诉 Next.js 使用应用程序根目录作为应用程序目录。
  // 2. 这意味着当使用服务器端组件时，Next.js 将会将 mongoose 视为一个外部依赖项，并在构建过程中将其排除在外。
  // experimental: {
  //   appDir: true,
  //   serverComponentsExternalPackages: ["mongoose"],
  // },
    // 允许你的应用可以加载来自指定域名的图片
    images: {
      domains: ['avatars.githubusercontent.com'],
    },
}

module.exports = nextConfig
