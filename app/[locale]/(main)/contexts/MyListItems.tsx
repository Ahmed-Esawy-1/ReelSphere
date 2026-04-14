"use client";
import React, { useContext, useEffect, useState } from "react";

interface ListItem {
  id: number;
  title: string;
  body: string;
  type: string[];
  actors: string[];
  year: number | string;
  imgSrc: string;
}

interface MyListContextType {
  myList: ListItem[];
  addToList: (item: ListItem) => void;
  removeFromList: (id: number) => void;
}

const MyListContext = React.createContext<MyListContextType | undefined>(
  undefined,
);

export const MyListProvider = ({ children }: { children: React.ReactNode }) => {
  const [myList, setMyList] = useState<ListItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("myList-items");
    if (stored) setMyList(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("myList-items", JSON.stringify(myList));
  }, [myList]);

  const addToList = (item: ListItem) => {
    const existed = myList.some((i) => i.id === item.id);
    if (!existed) setMyList((prev) => [...prev, item]);
  };

  const removeFromList = (id: number) => {
    setMyList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MyListContext.Provider value={{ myList, addToList, removeFromList }}>
      {children}
    </MyListContext.Provider>
  );
};

export default function useMyList() {
  const context = useContext(MyListContext);

  if (!context) {
    throw new Error("useMyList must be used within a MyListProvider");
  }

  return context;
}
