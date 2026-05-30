import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'https://foodi-o6pu.onrender.com'
  });

const useAxiosPublic =() => {
  return axiosPublic
}

export default useAxiosPublic
