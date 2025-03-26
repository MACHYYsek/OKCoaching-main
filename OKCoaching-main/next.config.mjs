import withPWA from "@ducanh2912/next-pwa";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  //TODO: Add CSP Content-Security-Policy"
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      // For dev only
      ...(process.env.NODE_ENV !== "production"
        ? [
            {
              protocol: "https",
              hostname: "placehold.jp",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/",
        headers: securityHeaders,
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggresiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default {
  ...pwaConfig,
  ...nextConfig,
};
