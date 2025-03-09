// src/components/blog/portable-text.tsx
import { PortableText as PortableTextComponent } from '@portabletext/react';
import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/blog/api';

// Definindo os componentes com o tipo correto da biblioteca
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full my-8 rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || 'Post image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <div className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }) => {
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-auto my-6">
          <code className="text-sm font-mono">{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <Link 
          href={value?.href || '#'} 
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mt-6 mb-2">{children}</h4>,
    normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

// Usando o tipo da biblioteca para o valor do Portable Text
import { PortableTextBlock } from '@portabletext/types';

interface PortableTextProps {
  value: PortableTextBlock | PortableTextBlock[];
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />;
}