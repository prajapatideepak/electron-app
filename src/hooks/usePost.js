import { useMutation } from "react-query";

const axios = require("axios");
const SERVER = "http://localhost:4000";

export function CreateAdmin(data) {
  return axios.post(`${SERVER}/admin`, data).then((res) => res);    
}
