import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private',
        '/private/*',
        '/api',
        '/api/*',
        '/studio',
        '/studio/*',
        '/*/admin',
        '/*/admin/*',
      ],
    },
    sitemap: 'https://prambanandigital.web.id/sitemap.xml',
  };
}
