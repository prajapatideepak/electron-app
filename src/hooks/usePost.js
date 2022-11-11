import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { ToastContainer , toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVER = "http://localhost:4000"

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
    throw error("data is not fatched")
  }

}

// -----------------------------------------------------------------------
// -----------------staff_table_one_faculty_details ----------------------
// -----------------------------------------------------------------------
export async function Facultydetails (id){
  try {
    const res = await axios.get(`${SERVER}/faculty//Facultydetails/` + id)
    return res
  } catch (error) {
    console.log(error)
  }
}

// ------------------------------------------------------------------------
// -----------------------------Update_faculty ----------------------------
// ------------------------------------------------------------------------
export async function Update_faculty (data) {
  try {
    const staff_id = data.faculty_id
    delete data.faculty_id
    const res = await axios.put(`${SERVER}/Faculty/update/${staff_id}`, data)
    return res
  } catch (error) {
    return error
  }
}

// ------------------------------------------------------------------------
// ------------------reciept_table_one_faculty_details --------------------
// ------------------------------------------------------------------------
export async function getFaculty (id){
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
    console.log(response)
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
export async function Facultyhistory (id) {
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
export async function Facultyreciept (id) {
  try {
    const res = await axios.get(`${SERVER}/salary/receipt/` + id)
    return res
  } catch (error) {
    console.log(error , "hsfuh")
  }
}



// ------------------------------------------------------------------------
// ------------------------ Update_faculty_reciept ------------------------
// ------------------------------------------------------------------------
export async function Update_faculty_reciept (data) {
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
export const Alloverstudent = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/students/`);
    return data;
  } catch (error) {
    throw error("data is not fatched")
  }

}


  


 

















