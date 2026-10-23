import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;

///const res= axios.get("").catch(function (error){  console.log(error.toJSON()); })
