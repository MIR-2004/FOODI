import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";

const Model = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const { signUpWithGmail, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //redirecting to home page 
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        toast.success("Signin successful!");
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage("Provide a correct email and password!");
      });
  };

  const handleGoogleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfo)
          .then(() => {
            toast.success("Signin successful!");
            document.getElementById("my_modal_5").close();
            navigate("/");
          })
          .catch(() => {
            toast.success("Welcome back!");
            document.getElementById("my_modal_5").close();
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
        <div className="modal-box glass-card border border-slate-800/80">
          <div className="modal-action flex flex-col justify-center mt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0 text-center relative" method="dialog">
              
              {/* Decorative brand header */}
              <div className="mb-4 flex flex-col items-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green/10 border border-green/20 rounded-full text-[10px] font-bold tracking-wider text-green uppercase mb-2">
                  <Sparkles className="h-3 w-3" /> Secure Access
                </div>
                <h3 className="font-extrabold text-2xl text-white tracking-tight">Please Login!</h3>
                <p className="text-xs text-slate-400 mt-1">Access your elite dining settings instantly</p>
              </div>

              {/* Standalone close trigger */}
              <button 
                type="button" 
                onClick={() => document.getElementById("my_modal_5").close()} 
                className="absolute -top-2 -right-2 text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800/60 rounded-full p-2 cursor-pointer transition duration-300"
              >
                ✕
              </button>

              <div className="space-y-4 my-4 text-left">
                {/* Email Input */}
                <div className="form-control">
                  <label className="block text-xs font-semibold text-slate-350 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={`appearance-none block w-full pl-10 pr-4 py-2.5 border bg-slate-950/65 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green focus:border-green transition-all duration-300 text-xs ${
                        errors.email ? "border-rose-500/50 focus:ring-rose-500 focus:border-rose-500" : "border-slate-800"
                      }`}
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-450 mt-0.5 font-medium">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="form-control">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-slate-350">
                      Password
                    </label>
                    <a href="#" className="text-[10px] font-semibold text-slate-400 hover:text-green transition duration-200">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`appearance-none block w-full pl-10 pr-10 py-2.5 border bg-slate-950/65 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green focus:border-green transition-all duration-300 text-xs ${
                        errors.password ? "border-rose-500/50 focus:ring-rose-500 focus:border-rose-500" : "border-slate-800"
                      }`}
                      {...register("password", { required: "Password is required" })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-450 mt-0.5 font-medium">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Error notifications */}
              {errorMessage && (
                <div className="p-2.5 my-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-450 text-[11px] font-semibold animate-pulse">
                  {errorMessage}
                </div>
              )}

              {/* Submit Action */}
              <div className="form-control mt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-xs font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green shadow-lg shadow-green/20 hover:scale-[1.01] active:scale-[0.99] transition duration-300"
                >
                  Sign In
                </button>
              </div>

              <p className="text-center text-xs text-slate-450 mt-3.5">
                Don't have an account?
                <Link 
                  to="/signup" 
                  onClick={() => document.getElementById("my_modal_5").close()} 
                  className="font-bold text-green hover:underline ml-1 transition"
                >
                  Signup Now
                </Link>
              </p>
            </form>

            {/* Social connection options */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800/80"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-[#121926]/95 px-2 text-slate-500 rounded-md font-semibold">Or join with</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 mb-1">
              <button 
                onClick={handleGoogleLogin}
                className="w-9 h-9 flex items-center justify-center bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-lg text-slate-400 hover:text-white transition duration-300"
              >
                <FaGoogle className="h-4 w-4 text-red-400" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-lg text-slate-400 hover:text-white transition duration-300">
                <FaFacebookF className="h-4 w-4 text-blue-500" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-lg text-slate-400 hover:text-white transition duration-300">
                <FaGithub className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Model;
