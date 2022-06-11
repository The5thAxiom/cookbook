import { useState } from "react";

export default function useAccessToken() {

  function getToken(){
    const userToken = localStorage.getItem('access_token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken: string) {
    localStorage.setItem('access_token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("access_token");
    setToken(null as any);
  }

  return {
    accessToken: token === null ? "" : token,
    setAccessToken: saveToken,
    removeAccessToken: removeToken
  }

}