import { useMutation } from "react-query";
import { getToken } from "../AuthProvider";
import React from "react";
import { NasirContext } from "../NasirContext";
import axios from "axios";
import { ToastContainer , toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = getToken("token");

export const axiosInstance = axios.create({
  headers: {
    Authorization: token,
  },
});
const SERVER = "http://localhost:4000";


//-----------------------------------------------------------------------
//--------------------------------- ADMIN -----------------------------
//-----------------------------------------------------------------------

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

export async function usegetAdmin() {
  return await axiosInstance.get(`${SERVER}/admin`).then((res) => res.data);
}

export function useGetAllAdmin() {
  return axiosInstance.get(`${SERVER}/admin/all`).then((res) => res.data);
}

//-----------------------------------------------------------------------
//--------------------------------- CLASS -----------------------------
//-----------------------------------------------------------------------


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

export async function ExportAllStudentsInClass(classID) {
  try {
    const { data } = await axios.get(
      `${SERVER}/classes/exportStudentInClass/` + classID
    );
    return data;
  } catch (error) {
    throw Error("data is not fatched");
  }
}

export async function ExportAllPendingStudentsInClass(classID) {
  try {
    const { data } = await axios.get(
      `${SERVER}/classes/exportPendingStudentInClass/` + classID
    );
    return data;
  } catch (error) {
    throw Error("data is not fatched");
  }
}




//-----------------------------------------------------------------------
//--------------------------------- STUDENT -----------------------------
//-----------------------------------------------------------------------

export async function registerStudent(data){
  return await axios.post(`${SERVER}/students/register`, data, 
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export async function getStudentDetails(student_id){
  return axios.get(`${SERVER}/students/details/${student_id}`).then((res) => res)
}

export async function studentAllAcademicDetails(student_id){
  return await axios.get(`${SERVER}/fees/all-academics/${student_id}`)
}

export async function studentFeesHistory(academic_id){
  return await axios.get(`${SERVER}/fees/fees-history/${academic_id}`)
}

export async function updateStudent(student_id, formdata){
  return await axios.put(`${SERVER}/students/update/${student_id}`, formdata)
}
export async function searchReceipt(fees_receipt_id){
  return await axios.get(`${SERVER}/receipt/search/${fees_receipt_id}`)
}

export async function generateStudentReceipt(data){
  return await axios.post(`${SERVER}/receipt/generate/student`, data)
}

export async function updateStudentReceipt(data){
  return await axios.put(`${SERVER}/receipt/update/student/${data.fees_receipt_id}`, data)
}

export async function cancelAdmission(student_id){
  return await axios.get(`${SERVER}/students/cancel-admission/${student_id}`)
}

export async function tranferFees(data){
  return await axios.post(`${SERVER}/fees/transfer/`, data)
}

export async function getAdminVerification(adminData){
  return await axios.post(`${SERVER}/admin/verify`, adminData)
}

export async function transferStudent(data){
  return await axios.post(`${SERVER}/students/transfer`, data)
}


//-----------------------------------------------------------------------
//--------------------------------- STAFF -----------------------------
//-----------------------------------------------------------------------

// ------------------------------------------------------------------------
// ----------------------- Add_Faculty ------------------------------------
// ------------------------------------------------------------------------
export async function Addfaculty(addnew) {
  try {
    const response = await axios.post(`${SERVER}/Faculty/register`, addnew)
      return response    
  } catch (error) {
    toast.error("Error!!")
    console.log(error)
  }
}

// -----------------------------------------------------------------------
// ------------------------All_Faculty -----------------------------------
// -----------------------------------------------------------------------
export const getAllFaculty = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/Faculty`);
    return data;
  } catch (error) {
    console.log(error)
  }

}

// -----------------------------------------------------------------------
// ------------------------All_Faculty -----------------------------------
// -----------------------------------------------------------------------
export const Exportallfaculty = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/Faculty/Exportallfaculty`);
    return data;
  } catch (error) {
    console.log(error)
  }

}

// -----------------------------------------------------------------------
// -----------------staff_table_one_faculty_details ----------------------
// -----------------------------------------------------------------------
export async function Facultydetails(id) {
  try {
    const res = await axios.get(`${SERVER}/faculty/Facultydetails/` + id)
    return res
  } catch (error) {
    console.log(error)
  }
}

// ------------------------------------------------------------------------
// -----------------------------Update_faculty ----------------------------
// ------------------------------------------------------------------------

export async function Update_faculty(staff_id , formdata) {
  try {
    const res = await axios.put(`${SERVER}/Faculty/update/${staff_id}`, formdata)
    return res
  } catch (error) {
    return error
  }
}

// ------------------------------------------------------------------------=
// ------------------reciept_table_one_faculty_details --------------------
// ------------------------------------------------------------------------
export async function getFaculty(id) {
  try {
    const res = await axios.get(`${SERVER}/faculty/Profilefaculty/` + id)
    return res
  } catch (error) {
    console.log(error)
  }
}

// ------------------------------------------------------------------------
// --------------------------- Reaciept_gen -------------------------------
// ------------------------------------------------------------------------
export async function salarypay(gen_reciept) {
  try {
    const response = await axios.post(`${SERVER}/salary/create-reciept/`, gen_reciept)
    return response
  } catch (error) {
    console.log(error)
  }

}

// ------------------------------------------------------------------------
// ---------------------------- All_Reaciept ------------------------------
// ------------------------------------------------------------------------
export const recieptdetails = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/salary`);
    return data;
  } catch (error) {
    throw error("data is not fatched")
  }

}

// ------------------------------------------------------------------------
// ------------------------- Staff_salary_Histery -------------------------
// ------------------------------------------------------------------------
export async function Facultyhistory(id) {
  try {
    const res = await axios.get(`${SERVER}/salary/Staffhistory/` + id)
    return res
  } catch (error) {
    console.log(error)
  }
}


// ------------------------------------------------------------------------
// -------------------------- Staff_salary_reciept =-----------------------
// ------------------------------------------------------------------------
export async function Facultyreciept(id) {
  try {
    const res = await axios.get(`${SERVER}/salary/receipt/` + id)
    return res
  } catch (error) {
    console.log(error)
  }
}



// ------------------------------------------------------------------------
// ------------------------ Update_faculty_reciept ------------------------
// ------------------------------------------------------------------------
export async function Update_faculty_reciept(data) {
  try {
    const salary_receipt_id = data.salary_receipt_id
    delete data.faculty_id
    const res = await axios.put(`${SERVER}/salary/update/${salary_receipt_id}`, data)
    return res
  } catch (error) {
    return error
  }
}

// -----------------------------------------------------------------------
// ------------------------ All_Over Student------------------------------
// -----------------------------------------------------------------------
export const Alloverstudent = async (section) => {
  try {
    const { data } = await axios.post(`${SERVER}/students/`, { is_primary : section });
    return data;
  } catch (error) {
    console.log(error)
  }
}
