"use client";
import { useState } from "react";
import Cookies from "js-cookie";

function useToken() {
  const getToken = () => {
    const tokenString = Cookies.get("token");
    return tokenString;
  };

  const getName = () => {
    const userName = Cookies.get("name");
    return userName;
  };

  const [token, setToken] = useState(getToken());
  const [userName, setUserName] = useState(getName());

  const clearToken = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("email");
    Cookies.remove("name")
  };

  return {
    token,
    userName,
    clearToken,
  };
}

export default useToken;
