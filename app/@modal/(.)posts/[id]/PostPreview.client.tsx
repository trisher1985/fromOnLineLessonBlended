'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);
  const [user, setUser] = useState<User | null>(null);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  useEffect(() => {
    if (!post) return;
    const fn = async () => {
      const response = await fetchUserById(post.userId);
      setUser(response);
    };
    fn();
  }, [post]);

  if (isLoading) return <p>Loading... Please wait...</p>;
  if (error || !post) return <p>Something went wrong...</p>;

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button onClick={handleClose} className={css.backBtn}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post.title}</h2>
          </div>

          <p className={css.content}>{post.body}</p>
        </div>
        {user && <p className={css.user}>Author: {user.name}</p>}
      </div>
    </Modal>
  );
}
