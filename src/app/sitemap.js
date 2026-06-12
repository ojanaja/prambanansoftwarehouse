export default function sitemap() {
  const baseUrl = 'https://prambanandigital.web.id';

  const languages = ['id', 'en'];
  const routes = [
    { path: '', changeFrequency: 'yearly', priority: 1.0 },
    { path: '/solutions', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/solutions/government', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/solutions/education', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/solutions/business', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/products', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/products/cms-landing-page', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/work', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/insights', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  ];

  const sitemapEntries = [];

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
