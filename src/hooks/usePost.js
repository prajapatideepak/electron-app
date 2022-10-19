import { useMutation } from "react-query";
import { getToken } from "../AuthProvider";
import React from "react";
import { NasirContext } from "../NasirContext";
const axios = require("axios");

const token = getToken("token");
console.log(token);

export const axiosInstance = axios.create({
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

export function useChangePassword() {
  return useMutation((values) =>
    axiosInstance.put(`${SERVER}/admin/forgot`, values).then((res) => res.data)
  );
}

export function useChangeByAdmin() {
  return useMutation((values) =>
    axiosInstance.put(`${SERVER}/admin/change`, values).then((res) => res.data)
  );
}

export function useUpdateAdmin() {
  return useMutation((values) =>
    axiosInstance.put(`${SERVER}/admin/`, values).then((res) => res.data)
  );
}

export function useSetDefault() {
  return useMutation((values) => {
    console.log(values);
    return axiosInstance
      .post(`${SERVER}/admin/default`, values)
      .then((res) => res.data);
  });
}

export function usegetAdmin() {
  return axiosInstance.get(`${SERVER}/admin`).then((res) => res.data);
}

export function useGetAllAdmin() {
  return axiosInstance.get(`${SERVER}/admin/all`).then((res) => res.data);
}
