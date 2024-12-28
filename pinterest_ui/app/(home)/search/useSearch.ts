import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../(postContext)/Post";

export default function useSearch() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listUser, setListUser] = useState<User[]>([]);

  return { search, setSearch, isLoading, setIsLoading, listUser, setListUser };
}

export interface SProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  listUset: User[];
  setListUser: Dispatch<SetStateAction<User[]>>;
}
