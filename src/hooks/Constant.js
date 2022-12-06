import axios from "axios";
import { getToken } from "../AuthProvider";

export const axiosInstance = axios.create({
  headers: {
    Authorization: getToken("token"),
  },
});

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
