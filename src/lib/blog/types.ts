// src/lib/blog/types.ts (certifique-se de atualizar este arquivo também)

import { PortableTextBlock } from '@portabletext/types';

export interface ImageAsset {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

export interface Slug {
  current: string;
  _type: string;
}

export interface Author {
  _id: string;
  name: string;
  image?: ImageAsset;
  bio?: PortableTextBlock[];
  slug?: Slug;
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
  slug: Slug;
}

export interface Post {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  body?: PortableTextBlock[]; // Alterado de content para body
  categories?: Category[];
  author?: Author;
}