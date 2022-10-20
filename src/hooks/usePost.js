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

export async function transferStudent(data) {
  return await axios.post(`${SERVER}/students/transfer`, data);
}

export async function AddClass(addnew) {
  try {
    const response = await axios.post(`${SERVER}/classes/create`, addnew);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateClass(classID, updatenew) {
  try {
    const response = await axios.put(
      `${SERVER}/classes/update/${classID}`,
      updatenew
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteClass(classID, deleteClass) {
  try {
    const response = await axios.put(
      `${SERVER}/classes/delete/${classID}`,
      deleteClass
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllClasses() {
  try {
    const { data } = await axios.get(`${SERVER}/classes/`);
    return data;
  } catch (error) {
    throw Error("data is not fatched");
  }
}

export async function getAllStudentsInClass(classID) {
  try {
    const { data } = await axios.get(
      `${SERVER}/classes/displaystudentinclass/` + classID
    );
    return data;
  } catch (error) {
    throw Error("data is not fatched");
  }
}

export async function getAllClassesByYear() {
  try {
    const { data } = await axios.get(`${SERVER}/classes/classesbyyear`);
    return data;
  } catch (error) {
    throw Error("data is not fatched");
  }
}

export async function transferClasses(addnew) {
  try {
    const response = await axios.post(
      `${SERVER}/classes/transferclasses`,
      addnew
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getActiveClasses() {
  return await axios.get(`${SERVER}/classes/active`);
}
