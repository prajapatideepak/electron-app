import { useMutation } from "react-query";

const axios = require("axios");
const SERVER = "http://localhost:4000";

export function useCreateAdmin() {
  return useMutation((values) =>
    axios.post(`${SERVER}/admin`, values).then((res) => res.data)
  );
}
