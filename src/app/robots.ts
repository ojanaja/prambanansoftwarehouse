import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/', '/studio/', '/*/admin/'],
    },
    sitemap: 'https://prambanandigital.web.id/sitemap.xml',
  };
}
