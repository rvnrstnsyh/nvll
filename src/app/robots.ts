import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/', '/_next/', '/admin/', '/auth/']
      }
    ],
    host: 'https://acme.com',
    sitemap: 'https://acme.com/sitemap.xml'
  }
}
