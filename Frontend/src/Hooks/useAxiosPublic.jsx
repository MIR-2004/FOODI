import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://foodi-o6pu.onrender.com'
  });

const useAxiosPublic =() => {
  return axiosPublic
}

export default useAxiosPublic
