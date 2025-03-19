import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Cliente Sanity configurado
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1awvvk0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-03-09',
  useCdn: false,
})

// Interface para um post do Sanity
interface Post {
  slug: {
    current: string
  };
  _updatedAt: string;
}

export async function GET() {
  try {
    // Buscar todos os posts do blog do Sanity
    const posts: Post[] = await client.fetch(`*[_type == "post"] {
      slug,
      _updatedAt
    }`)

    // Verificar se temos posts para mostrar
    if (!posts || posts.length === 0) {
      return new NextResponse('<!-- No posts found -->', {
        headers: { 'Content-Type': 'text/xml' },
      })
    }

    // Construir o XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts
          .map((post) => {
            return `
              <url>
                <loc>${process.env.SITE_URL}/blog/${post.slug.current}</loc>
                <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
              </url>
            `
          })
          .join('')}
      </urlset>
    `

    // Retornar o XML com o cabeçalho adequado
    return new NextResponse(sitemap, {
      headers: { 'Content-Type': 'text/xml' },
    })
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}