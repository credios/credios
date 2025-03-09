// src/lib/blog/utils.ts
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'd MMM yyyy', { locale: ptBR });
}

export function getSlugString(slug: { current: string } | string): string {
  if (typeof slug === 'string') return slug;
  return slug?.current || '';
}