import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, TrendingUp, Users, ChefHat } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const showcaseData = [
  {
    image: "/images/home/banner.png",
    title: "Join the Next Generation of Dining",
    subtitle: "Register your merchant profile today to manage active menu selections, orchestrate table bookings, and process Stripe checkouts in one unified dashboard.",
    badge: "Gourmet SaaS Platform"
  },
  {
    image: "/images/home/category/img1.png",
    title: "Launch Custom Catalog Items",
    subtitle: "Upload gorgeous recipe photos, set special seasonal promotions, and adjust catalog items instantaneously for your customers.",
    badge: "Infinite Menu Flex"
  },
  {
    image: "/images/home/category/img2.png",
    title: "Enterprise Checkout Solutions",
    subtitle: "Experience high-performance payment gateways that settle transactions safely using standard Stripe secure APIs.",
    badge: "Direct Digital Sales"
  },
  {
    image: "/images/home/category/img3.png",
    title: "Complete Merchant Control Room",
    subtitle: "Harness comprehensive analytical pipelines tracking daily earnings, order completions, and general user growth metrics.",
    badge: "Analytics Command Suite"
  }
];

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeShowcase, setActiveShowcase] = useState(0);

  const { signUpWithGmail, createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Slide rotation trigger
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % showcaseData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        updateUserProfile(data.name, "").then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic
            .post("/users", userInfo)
            .then((response) => {
              toast.success("Account Created Successfully");
              navigate(from, { replace: true });
            })
            .catch((err) => {
              // Handle database error but navigate since Firebase registered successfully
              console.log("DB sync warning:", err.message);
              toast.success("Account Created Successfully");
              navigate(from, { replace: true });
            });
        });
      })
      .catch((error) => {
        setErrorMessage(error.message || "Failed to create account. Please try again.");
      });
  };

  const handleGoogleSignup = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((response) => {
            toast.success("Account Created Successfully");
            navigate("/");
          })
          .catch(() => {
            toast.success("Account synced successfully!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row relative overflow-hidden">
      
      {/* LEFT COLUMN: Premium SaaS Branding (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-slate-950 via-[#090d18] to-slate-950 flex-col justify-between p-12 lg:p-16 relative overflow-hidden border-r border-slate-900/60">
        
        {/* Animated background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        {/* Carousel background cross-fade */}
        <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out opacity-25">
          {showcaseData.map((show, idx) => (
            <img
              key={idx}
              src={show.image}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === activeShowcase ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/90 to-slate-950/60"></div>
        </div>
        
        {/* Brand header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group transform hover:scale-105 transition-all duration-300">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-green via-emerald-400 to-green text-slate-950 font-black shadow-lg shadow-green/20 group-hover:scale-105 transition-all duration-300">
              <ChefHat className="w-5 h-5 text-slate-950" />
              <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-green to-emerald-400 blur-sm opacity-50 -z-10" />
            </div>
            <span className="font-['Outfit'] text-xl font-black tracking-tight leading-none text-white">
              in<span className="text-green">food</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition duration-300 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-lg backdrop-blur-md">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Site
          </Link>
        </div>

        {/* Interactive Showcase Typography */}
        <div className="relative z-10 space-y-6 my-auto max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green/10 border border-green/20 rounded-full text-xs font-semibold tracking-wider text-green uppercase animate-bounce">
            <Sparkles className="h-3.5 w-3.5" /> {showcaseData[activeShowcase].badge}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white transition-all duration-500 min-h-[120px]">
            {showcaseData[activeShowcase].title.split(" ").map((word, i, arr) => {
              if (i >= arr.length - 2) {
                return (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-400">
                    {" "}{word}
                  </span>
                );
              }
              return " " + word;
            })}
          </h1>
          
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed font-light transition-all duration-500">
            {showcaseData[activeShowcase].subtitle}
          </p>

          {/* Indicators dots */}
          <div className="flex gap-2 pt-2">
            {showcaseData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveShowcase(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeShowcase ? "w-8 bg-green" : "w-2 bg-slate-800"
                }`}
              />
            ))}
          </div>

          {/* Floating metrics grid */}
          <div className="grid grid-cols-2 gap-4 pt-6 max-w-md">
            <div className="flex bg-slate-900/40 backdrop-blur-md border border-slate-800/60 py-3 px-4 rounded-xl items-center gap-3 shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="p-2 rounded-lg bg-green/10 text-green">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h5 className="font-bold text-slate-100 text-sm">15K+ Active</h5>
                <p className="text-slate-400 text-xs">SaaS Merchants</p>
              </div>
            </div>
            <div className="flex bg-slate-900/40 backdrop-blur-md border border-slate-800/60 py-3 px-4 rounded-xl items-center gap-3 shadow-lg transform hover:-translate-y-1 transition duration-300">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h5 className="font-bold text-slate-100 text-sm">99.9% Uptime</h5>
                <p className="text-slate-400 text-xs">Stripe Settlement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand footer */}
        <div className="relative z-10 text-slate-500 text-xs flex justify-between items-center">
          <p>© {new Date().getFullYear()} infood. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-350 transition">Privacy</a>
            <a href="#" className="hover:text-slate-350 transition">Terms</a>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Glassmorphic Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 relative min-h-screen bg-slate-950 md:bg-transparent">
        {/* Halos for mobile view where left column is hidden */}
        <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 glass-card rounded-[2.5rem] p-8 md:p-10 border border-slate-800/80 relative z-10 shadow-2xl transition-all duration-500">
          
          {/* Header */}
          <div className="text-center relative">
            <div className="md:hidden mb-6 flex justify-center">
              <Link to="/" className="flex items-center gap-3 group transform hover:scale-105 transition-all duration-300">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-green via-emerald-400 to-green text-slate-950 font-black shadow-lg shadow-green/20 group-hover:scale-105 transition-all duration-300">
                  <ChefHat className="w-5 h-5 text-slate-950" />
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-green to-emerald-400 blur-sm opacity-50 -z-10" />
                </div>
                <span className="font-['Outfit'] text-xl font-black tracking-tight leading-none text-white">
                  in<span className="text-green">food</span>
                </span>
              </Link>
            </div>
            
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Create An Account
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Join us to explore premium dining options
            </p>

            {/* Standalone close button */}
            <Link to="/" className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 rounded-full p-2.5 cursor-pointer transition duration-300 shadow-md">
              ✕
            </Link>
          </div>

          {/* Signup Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              
              {/* Name Input */}
              <div className="form-control">
                <label className="block text-sm font-semibold text-slate-300 mb-1.5 text-left">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <User className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`appearance-none block w-full pl-11 pr-4 py-3 border bg-slate-950/65 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green focus:border-green transition-all duration-300 text-sm ${
                      errors.name ? "border-rose-500/50 focus:ring-rose-500 focus:border-rose-500" : "border-slate-800"
                    }`}
                    {...register("name", { required: "Full Name is required" })}
                  />
                </div>
                {errors.name && (
                  <p className="text-left text-xs text-rose-450 mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="block text-sm font-semibold text-slate-300 mb-1.5 text-left">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`appearance-none block w-full pl-11 pr-4 py-3 border bg-slate-950/65 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green focus:border-green transition-all duration-300 text-sm ${
                      errors.email ? "border-rose-500/50 focus:ring-rose-500 focus:border-rose-500" : "border-slate-800"
                    }`}
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-left text-xs text-rose-450 mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="block text-sm font-semibold text-slate-300 mb-1.5 text-left">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Lock className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`appearance-none block w-full pl-11 pr-11 py-3 border bg-slate-950/65 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green focus:border-green transition-all duration-300 text-sm ${
                      errors.password ? "border-rose-500/50 focus:ring-rose-500 focus:border-rose-500" : "border-slate-800"
                    }`}
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-left text-xs text-rose-450 mt-1 font-medium">{errors.password.message}</p>
                )}
              </div>

            </div>

            {/* Error notifications */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-450 text-xs font-semibold text-center leading-relaxed animate-pulse">
                {errorMessage}
              </div>
            )}

            {/* Submit Action */}
            <div className="form-control pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green shadow-lg shadow-green/20 hover:shadow-green/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                Create Account
              </button>
            </div>

            {/* Switch page link */}
            <p className="text-center text-sm text-slate-450">
              Have an account?
              <Link to="/login" className="font-semibold text-green hover:text-emerald-450 hover:underline ml-1.5 transition">
                Login Now
              </Link>
            </p>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#121926]/90 px-3 text-slate-500 rounded-md font-semibold">Or secure register with</span>
            </div>
          </div>

          {/* Social Authentication */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleGoogleSignup} 
              className="w-12 h-12 flex items-center justify-center bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-md hover:shadow-green/10"
            >
              <FaGoogle className="h-5 w-5 text-red" />
            </button>
            <button 
              className="w-12 h-12 flex items-center justify-center bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
            >
              <FaFacebookF className="h-5 w-5 text-blue-500" />
            </button>
            <button 
              className="w-12 h-12 flex items-center justify-center bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
            >
              <FaGithub className="h-5 w-5 text-white" />
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Signup;
