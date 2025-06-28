'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';

export default function PostPreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);

  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => post ? fetchUserById(post.userId) : null,
    enabled: !!post,
  });

  if (isPostLoading) return <p>Loading, please wait...</p>;
  if (postError || !post) return <p>Something went wrong</p>;

  return (
    <Modal onClose={() => router.back()}>
      <button onClick={() => router.back()} className={css.backBtn}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post.title}</h2>
          </div>
          <p className={css.content}>{post.body}</p>
        </div>
        {!isUserLoading && user && !userError && (
          <p className={css.user}>Author: {user.name}</p>
        )}
      </div>
    </Modal>
  );
}