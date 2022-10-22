import { useQuery } from "react-query";
import { usegetAdmin } from "./hooks/usePost";

export function setToken(key, value) {
  localStorage.setItem(key, value);
}

export function VerifyAdmin() {
  const data = useQuery("admin", usegetAdmin);
  console.log(data);
  if (data.isError) {
    localStorage.clear();
  }
  if (data.isSuccess) {
    return true;
  }
}

export function getToken(key) {
  let token = localStorage.getItem(key);
  return token;
}

export function handleLogout() {
  localStorage.clear();
}
