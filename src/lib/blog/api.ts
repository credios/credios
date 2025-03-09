// src/lib/blog/api.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanity/lib/client';
import { Post, Category, ImageAsset } from './types';

// Configurar o builder de imagens
const builder = imageUrlBuilder(client);

export function urlFor(source: ImageAsset) {
  return builder.image(source);
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      readingTime,
      featured,
      categories[] -> {
        _id,
        title,
        slug
      },
      author -> {
        _id,
        name,
        image,
        slug
      }
    }
  `);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await client.fetch(`
    *[_type == "post" && slug.current == $slug] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      content,
      readingTime,
      featured,
      categories[] -> {
        _id,
        title,
        slug
      },
      author -> {
        _id,
        name,
        image,
        bio,
        slug
      }
    }
  `, { slug });
  
  return posts.length > 0 ? posts[0] : null;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      readingTime,
      categories[] -> {
        _id,
        title,
        slug
      },
      author -> {
        _id,
        name,
        image,
        slug
      }
    }
  `);
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      description,
      slug
    }
  `);
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      readingTime,
      categories[] -> {
        _id,
        title,
        slug
      },
      author -> {
        _id,
        name,
        image,
        slug
      }
    }
  `, { categorySlug });
}