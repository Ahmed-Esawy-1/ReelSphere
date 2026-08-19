"use client";

import React, { useEffect } from "react";

const LoginActive = () => {
  useEffect(() => {
    sessionStorage.getItem("login") || false;
  }, []);
  return <div>LoginActive</div>;
};

export default LoginActive;
