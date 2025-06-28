import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import  PostPreviewClient  from "./PostPreview.client";
import { fetchPostById } from '@/lib/api';
import { Metadata } from 'next';

interface PostDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailProps): Promise<Metadata> {
  const { id } = await params;
  const parsedId = Number(id);
  const post = await fetchPostById(parsedId);

  return {
    title: post.title,
    description: `${post.body.slice(0, 21)}...`,
  };
}

export default async function PostDetails({ params }: PostDetailProps) {
  const { id } = await params;
  const parsedId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient/>
    </HydrationBoundary>
  );
}