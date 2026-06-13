import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPortfolios, getArticles } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const languages = ['id', 'en'];

  const staticRoutes = [
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

  // Fetch dynamic portfolios and articles
  const [portfolios, articles] = await Promise.all([
    getPortfolios().catch(() => []),
    getArticles().catch(() => []),
  ]);

  // Generate static and dynamic sitemap entries
  languages.forEach((lang) => {
    // 1. Static Routes
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });

    // 2. Dynamic Portfolios (Work)
    portfolios.forEach((project) => {
      if (project.slug) {
        sitemapEntries.push({
          url: `${baseUrl}/${lang}/work/${project.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        });
      }
    });

    // 3. Dynamic Insights (Articles)
    articles.forEach((article) => {
      if (article.slug) {
        sitemapEntries.push({
          url: `${baseUrl}/${lang}/insights/${article.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        });
      }
    });
  });

  return sitemapEntries;
}
