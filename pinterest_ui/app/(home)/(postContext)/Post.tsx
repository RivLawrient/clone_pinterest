"use client";
import { createContext, useState, useContext, useEffect } from "react";

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
};
const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!post) {
      fetch("http://127.0.0.1:4000/post/list", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setPost(data.data))
        .catch((err) => console.error(err));
    }
  }, [post]);
  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("Something error post context");
  }
  return context;
};
