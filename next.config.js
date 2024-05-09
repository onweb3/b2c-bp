/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		appDir: true,
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "a0.muscache.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.gstatic.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api-server-i1.mytravellerschoice.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "file-cdn.mytravellerschoice.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "tctt.b-cdn.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "8189",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "d1i3enf1i5tb1f.cloudfront.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api-server-i1.mytravellerschoice.com",
				port: "8189",
				pathname: "/public/images/**",
			},
			{
				protocol: "https",
				hostname: "https://b2c.travellerschoice.ae",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "2817548791-files.gitbook.io",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "3345738593-files.gitbook.io",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.freelogovectors.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.ccavenue.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};
module.exports = nextConfig;
