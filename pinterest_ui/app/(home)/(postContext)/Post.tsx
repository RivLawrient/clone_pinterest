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
  comment: string;
  username: string;
  profile_img: string;
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
  total_like: number;
  comment: Comment[] | null;
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
  isEmpty: boolean;
  setPostLoading: (postLoading: boolean) => void;
  loadMorePosts: () => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<ListPost[]>([]);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const loadMorePosts = async () => {
    if (post.length == 0) {
      setPostLoading(true);
      await fetch(`${process.env.HOST_API_PUBLIC}/posts`, {
        method: "GET",
        credentials: "include",
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            if (data.data.length == 0) {
              setIsEmpty(true);
              setPostLoading(false);
            } else {
              setPost(data.data);
              console.log(data.data);
              setPostLoading(false);
            }
          }
        })
        .finally(() => setPostLoading(false));
    } else {
      setMoreLoading(true);
      console.log("terpanggil");
      await fetch(`${process.env.HOST_API_PUBLIC}/posts`, {
        method: "GET",
        credentials: "include",
      }).then(async (response) => {
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
          setMoreLoading(false);
        }
      });
      // .finally(() => setMoreLoading(false));
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        postLoading,
        moreLoading,
        isEmpty,
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
