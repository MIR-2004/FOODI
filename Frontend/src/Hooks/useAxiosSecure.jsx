import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:6001'
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Use refs so the interceptor always sees the latest logOut/navigate
  // without needing to re-register interceptors on every render
  const logOutRef = useRef(logOut);
  const navigateRef = useRef(navigate);
  logOutRef.current = logOut;
  navigateRef.current = navigate;

  useEffect(() => {
    // Request Interceptor — attach JWT token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor — only force-logout on 401 (token invalid/expired)
    // 403 means "authenticated but not authorized" — don't logout for that
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
          await logOutRef.current();
          navigateRef.current("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup — eject interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []); // stable — refs handle updates without re-registering

  return axiosSecure;
};

export default useAxiosSecure;
