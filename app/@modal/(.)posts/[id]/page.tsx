import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchPostById } from '@/lib/api';


interface PostDetailsProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
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
      
    </HydrationBoundary>
  );
}