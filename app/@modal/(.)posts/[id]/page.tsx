import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchPostById } from '@/lib/api';
import PostPreviewClient from './PostPreview.client';

interface PostDetailsProps {
  params: {
    id: string;
  };
}

export default async function PostPreview({ params }: PostDetailsProps) {
  const { id } = params;
  const parsedId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient id={parsedId} />
    </HydrationBoundary>
  );
}