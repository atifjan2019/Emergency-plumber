import { getPublicClient } from '@/lib/supabase/public';

export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  service: string;
  text: string;
};

type Row = {
  id: string;
  name: string;
  city_slug: string;
  rating: number;
  service: string;
  text: string;
  review_date: string;
};

const toReview = (r: Row): Review => ({
  id: r.id,
  name: r.name,
  city: r.city_slug,
  rating: r.rating,
  date: r.review_date,
  service: r.service,
  text: r.text,
});

export async function getReviewsByCity(citySlug: string, limit = 8): Promise<Review[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, city_slug, rating, service, text, review_date')
    .eq('city_slug', citySlug)
    .eq('published', true)
    .order('review_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[reviews] getReviewsByCity error:', error.message);
    return [];
  }
  return (data ?? []).map(toReview);
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, city_slug, rating, service, text, review_date')
    .eq('published', true)
    .order('review_date', { ascending: false })
    .limit(40);

  if (error) {
    console.error('[reviews] getFeaturedReviews error:', error.message);
    return [];
  }

  const seen = new Set<string>();
  const featured: Review[] = [];
  for (const row of data ?? []) {
    if (seen.has(row.city_slug)) continue;
    seen.add(row.city_slug);
    featured.push(toReview(row));
    if (featured.length >= limit) break;
  }
  return featured;
}
