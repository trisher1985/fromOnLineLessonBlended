import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPostById } from '@/lib/api';

type ParamsType = {
  id: string;
};

type PageProps = {
  params: ParamsType;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function PostPreview({ params }: PageProps) {
  const { id } = params;
  const parsedId = Number(id);

  const queryClient = new QueryClient();
  
  try {
    await queryClient.prefetchQuery({
      queryKey: ['post', parsedId],
      queryFn: () => fetchPostById(parsedId),
    });
  } catch (error) {
    console.error('Failed to prefetch post:', error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      
    </HydrationBoundary>
  );
}

