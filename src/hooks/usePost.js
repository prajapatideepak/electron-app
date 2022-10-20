import axios from "axios";

const SERVER = "http://localhost:4000";

//-----------------------------------------------------------------------
//--------------------------------- CLASSES -----------------------------
//-----------------------------------------------------------------------

export async function AddClass(addnew) {
    try {
        const response = await axios.post(`${SERVER}/classes/create`, addnew)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function updateClass(classID,updatenew) {
    try {
        const response = await axios.put(`${SERVER}/classes/update/${classID}`, updatenew)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function deleteClass(classID,deleteClass) {
    try {
        const response = await axios.put(`${SERVER}/classes/delete/${classID}`, deleteClass)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getAllClasses (){
  try {
    const {data} = await axios.get(`${SERVER}/classes/`)
    return data;
  } catch (error) {
      throw Error("data is not fatched")
  }
}

export async function getAllStudentsInClass (classID){
  try {
    const {data} = await axios.get(`${SERVER}/classes/displaystudentinclass/` + classID)
    return data;
  } catch (error) {
      throw Error("data is not fatched")
  }

}

export async function getAllClassesByYear (){
  try {
    const {data} = await axios.get(`${SERVER}/classes/classesbyyear`)
    return data;
  } catch (error) {
      throw Error("data is not fatched")
  }

}

export async function transferClasses(addnew) {
  try {
      const response = await axios.post(`${SERVER}/classes/transferclasses`, addnew)
      return response
  } catch (error) {
      console.log(error)
  }

}

export async function getActiveClasses(){
  return await axios.get(`${SERVER}/classes/active`);
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
//--------------------------------- ADMIN -----------------------------
//-----------------------------------------------------------------------



//-----------------------------------------------------------------------
//--------------------------------- STAFF -----------------------------
//-----------------------------------------------------------------------

