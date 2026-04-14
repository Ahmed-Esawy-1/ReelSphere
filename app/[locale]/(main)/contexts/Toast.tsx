"use client";
import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ToastContextType {
  notify: (msg: string, type: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const notify = (msg: string, type: "success" | "error") => {
    toast(msg, {
      type: type,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  };
    

    
  return (
    <ToastContext.Provider value={{ notify: notify }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
}

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
