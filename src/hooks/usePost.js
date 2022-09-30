import { useMutation } from "react-query";
import { getToken } from "../AuthProvider";
const axios = require("axios");

const token = getToken("token");
console.log(token);
const axiosInstance = axios.create({
  headers: {
    Authorization: token,
  },
});
const SERVER = "http://localhost:4000";

export function useCreateAdmin() {
  return useMutation((values) =>
    axiosInstance.post(`${SERVER}/admin`, values).then((res) => res.data)
  );
}

  

export function useLoginAdmmin() {
  return useMutation((values) =>
    axiosInstance.post(`${SERVER}/admin/login`, values).then((res) => res.data)
  );
}

export function usegetAdmin() {
  return axiosInstance.get(`${SERVER}/admin`).then((res) => res.data);
}
