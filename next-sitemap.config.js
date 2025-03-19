/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://credios.com.br',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://credios.com.br/api/sitemap-blog.xml',
    ],
  },
  exclude: ['/admin', '/api/*'],
  priority: 0.7,
  changefreq: 'daily',
  
  transform: async (config, path) => {
    if (path.includes('/produto/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}