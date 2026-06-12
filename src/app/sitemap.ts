import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prambanandigital.web.id';

  const languages = ['id', 'en'];
  const routes = [
    { path: '', changeFrequency: 'yearly' as const, priority: 1.0 },
    { path: '/solutions', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/solutions/government', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/solutions/education', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/solutions/business', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/products', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/products/cms-landing-page', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/work', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/insights', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  return sitemapEntries;
}
