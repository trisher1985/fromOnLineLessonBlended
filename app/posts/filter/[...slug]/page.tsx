import { fetchPosts } from '@/lib/api';

import { Metadata } from 'next';
import PostsClient from './Posts.client';

type PostsPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PostsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const userId = slug[0];

  return {
    title: `Posts - ${userId === 'All' ? 'All users' : userId}`,
    description: `Browse posts tagged with ${
      userId === 'All' ? 'all users' : userId
    }. Postly helps you filter and explore posts based on topics that matter to you.`,
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const userId = slug[0];
  const data = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId && userId !== 'All' && { userId }),
  });
  console.log(data);
  return <PostsClient initialData={data} userId={userId} />;
}
