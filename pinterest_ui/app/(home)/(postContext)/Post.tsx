import { createContext, useState, useContext } from "react";

export interface Post {
  id: number;
  title: string;
  content: string;
}
type PostContextType = {
  post: Post | null;
  setPost: (post: Post) => void;
};
const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<Post | null>(null);

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
