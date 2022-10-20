import axios from "axios";

const SERVER = "http://localhost:4000"

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


export async function transferStudent(data){
  return await axios.post(`${SERVER}/students/transfer`, data)
}