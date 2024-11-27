"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  profile_img: string;
  follower: number;
  following: number;
  follow_status: boolean;
}

export interface Post {
  id: string;
  title: string;
  user: User;
  description: string;
  image: string;
  created_at: string;
}

type PostContextType = {
  post: Post[] | null;
  setPost: (post: Post[]) => void;
  postLoading: boolean;
  setPostLoading: (postLoading: boolean) => void;
  loadMorePosts: () => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<Post[] | null>(null);
  const [postLoading, setPostLoading] = useState<boolean>(false);

  const loadMorePosts = async () => {
    if (postLoading) return;

    setPostLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:4000/post/list", {
        credentials: "include",
      });
      const data = await response.json();
      setPost((prevPost) =>
        prevPost ? [...prevPost, ...data.data] : data.data,
      );
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
