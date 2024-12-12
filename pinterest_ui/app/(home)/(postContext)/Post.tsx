"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  profile_img: string;
  follow: Follow | null;
}

export interface Follow {
  follower_count: number | null;
  following_count: number | null;
  follow_status: boolean | null;
}

export interface Comment {
  id: string;
  comment: string;
  post_id: string;
  user: User;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  user: User;
  description: string;
  image: string;
  save_status: boolean;
  like_status: boolean;
  total_like: number | null;
  comment: Comment[] | null;
  created_at: string;
}

export interface ListPost {
  id: string;
  image: string;
  save_status: boolean;
}
type PostContextType = {
  post: ListPost[];
  setPost: React.Dispatch<React.SetStateAction<ListPost[]>>;
  postLoading: boolean;
  moreLoading: boolean;
  setPostLoading: (postLoading: boolean) => void;
  loadMorePosts: () => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<ListPost[]>([]);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    setPostLoading(true);
    fetch(`${process.env.HOST_API_PUBLIC}/posts`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setPost(data.data);
          console.log(data.data);
        }
      })
      .then(() => setPostLoading(false));
  }, []);

  const loadMorePosts = async () => {
    setMoreLoading(true);
    await fetch(`${process.env.HOST_API_PUBLIC}/posts`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setPost((prevPost) => {
            if (!prevPost) return data.data;
            const newPosts = data.data.filter(
              (newPost: ListPost) =>
                !prevPost.some(
                  (existingPost) => existingPost.id === newPost.id,
                ),
            );
            return [...prevPost, ...newPosts];
          });
        }
      })
      .finally(() => setMoreLoading(false));
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        postLoading,
        moreLoading,
        setPostLoading,
        loadMorePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
