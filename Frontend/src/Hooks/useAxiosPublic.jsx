import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://foodi-cn26.onrender.com'
  });

const useAxiosPublic =() => {
  return axiosPublic
}

export default useAxiosPublic
