export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/', '/studio/', '/*/admin/'],
    },
    sitemap: 'https://prambanandigital.web.id/sitemap.xml',
  }
}
