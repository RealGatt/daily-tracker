/** @type {import('next').NextConfig} */

const nextConfig = {
	swcMinify: true,
	reactStrictMode: false,
	compress: true,
	outputFileTracing: true,
	experimental: {
		// ppr: true,
		outputFileTracingExcludes: {
			"*": [
				"./**/node_modules/@swc/core-linux-x64-gnu",
				"./**/node_modules/@swc/core-linux-x64-musl",
				"./**/node_modules/esbuild/linux",
				"./**/node_modules/webpack",
				"./**/node_modules/rollup",
				"./**/node_modules/terser",
			],
		},
	},

	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

// https://nextjs.org/docs/advanced-features/security-headers

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: "Referrer-Policy",
		value: "origin-when-cross-origin",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains; preload",
	},
];
module.exports = nextConfig;
