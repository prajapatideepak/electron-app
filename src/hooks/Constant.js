import axios from "axios";
import { getToken } from "../AuthProvider";

export const axiosInstance = axios.create({
  headers: {
    Authorization: getToken("token"),
  },
});
