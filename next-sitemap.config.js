/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // --- ALTERAÇÃO PRINCIPAL AQUI ---
  // Use a URL canônica definida na Vercel (com www)
  siteUrl: process.env.SITE_URL || 'https://www.credios.com.br',
  // --- FIM DA ALTERAÇÃO ---

  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      // Certifique-se que este sitemap também use a URL com www, se aplicável
      'https://www.credios.com.br/api/sitemap-blog.xml', // Ajustado para www
    ],
  },
  exclude: ['/admin', '/api/*'], // '/api/*' já exclui '/api/sitemap-blog.xml', mas pode mantê-lo em additionalSitemaps
  priority: 0.7,
  changefreq: 'daily',

  // A opção trailingSlash da biblioteca next-sitemap também existe!
  // O padrão é false, o que corresponde ao padrão do Next.js.
  // Se suas URLs canônicas DEVERIAM ter uma barra no final, defina como true.
  // trailingSlash: false, // (Padrão - geralmente correto se next.config.js também for padrão)

  transform: async (config, path) => {
    // A lógica de transformação parece OK, apenas garante que o 'path' será combinado com o siteUrl correto (com www)
    if (path.includes('/produto/')) {
      return {
        loc: path, // next-sitemap combinará isso com o siteUrl (com www)
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    return {
      loc: path, // next-sitemap combinará isso com o siteUrl (com www)
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}