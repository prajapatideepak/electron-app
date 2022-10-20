const axios = require("axios");
const SERVER = "http://localhost:4000";

export function CreateAdmin(data) {
  return axios.post(`${SERVER}/admin`, data).then((res) => res);    
}

export async function getActiveClasses(){
  return await axios.get(`${SERVER}/classes/active`);
}

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




