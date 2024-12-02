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

type PostContextType = {
  post: Post[];
  setPost: React.Dispatch<React.SetStateAction<Post[]>>;
  postLoading: boolean;
  setPostLoading: (postLoading: boolean) => void;
  loadMorePosts: () => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<Post[]>([]);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const loadMorePosts = async () => {
    if (postLoading) return;

    setPostLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:4000/posts", {
        credentials: "include",
      });
      const data = await response.json();
      setPost((prevPost) => {
        if (!prevPost) return data.data;

        // Filter out posts with duplicate IDs
        const newPosts = data.data.filter(
          (newPost: Post) =>
            !prevPost.some((existingPost) => existingPost.id === newPost.id),
        );

        return [...prevPost, ...newPosts];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ post, setPost, postLoading, setPostLoading, loadMorePosts }}
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
