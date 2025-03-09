// src/lib/blog/types.ts

// Interfaces para tipos específicos
export interface ImageAsset {
  _key?: string;
  _type?: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

interface BlockContent {
  _key: string;
  _type: string;
  // Propriedades comuns para diferentes tipos de blocos
  children?: Array<{
    _key: string;
    _type: string;
    marks?: string[];
    text?: string;
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
  }>;
  style?: string;
  // Permite propriedades adicionais com índice de string
  [key: string]: unknown;
}

export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: ImageAsset;
  bio: BlockContent[];
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: ImageAsset;
  publishedAt: string;
  categories?: Category[];
  author?: Author;
  content: BlockContent[];
  readingTime?: number;
  featured?: boolean;
}