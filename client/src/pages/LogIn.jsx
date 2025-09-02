// LogIn.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Star, Heart, Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";

export default function LogIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("🌸 Logging you in...");

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userInfo", JSON.stringify(res.data));

      toast.success("✨ Welcome back, gorgeous!", { id: toastId });
      navigate("/dashboard");
    } catch (err) {
      console.log(`Error: ${err}`);
      toast.error(err.response?.data?.message || "💔 Login failed, please try again", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingHeartVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [-5, 5, -5],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const sparkleVariants = {
    animate: {
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Enhanced Toast Configuration */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: "linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 100%)",
              color: "#065F46",
              borderRadius: "20px",
              padding: "16px 24px",
              fontWeight: "600",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            },
            iconTheme: {
              primary: "#10B981",
              secondary: "#FFFFFF",
            },
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #FECACA 0%, #FCA5A5 100%)",
              color: "#DC2626",
              borderRadius: "20px",
              padding: "16px 24px",
              fontWeight: "600",
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#FFFFFF",
            },
          },
          loading: {
            style: {
              background: "linear-gradient(135deg, #F9A8D4 0%, #F472B6 100%)",
              color: "#831843",
              borderRadius: "20px",
              padding: "16px 24px",
              fontWeight: "600",
              boxShadow: "0 10px 30px rgba(244, 114, 182, 0.3)",
            },
          },
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          variants={floatingHeartVariants}
          animate="animate"
          className="absolute top-20 left-10 w-6 h-6 text-pink-300 opacity-60"
        >
          <Heart className="w-full h-full fill-current" />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          className="absolute top-32 right-16 w-5 h-5 text-purple-300 opacity-60"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
        <motion.div
          variants={floatingHeartVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-32 left-20 w-4 h-4 text-teal-300 opacity-60"
        >
          <Star className="w-full h-full fill-current" />
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl h-[calc(100vh-2rem)] md:h-[700px] relative"
      >
        {/* Glassmorphism container with enhanced styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-purple-50/40 to-teal-50/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300/30 via-purple-300/30 via-teal-300/30 to-pink-300/30 bg-[length:200%_100%] animate-gradient-x rounded-3xl p-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl h-full w-full" />
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col lg:flex-row rounded-3xl overflow-hidden">
          {/* Welcome Side Content - Enhanced */}
          <div className="hidden lg:flex flex-col justify-center items-start w-full lg:w-1/2 p-8 xl:p-12 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-lg mr-4 relative"
                >
                  <Heart className="w-7 h-7 text-white fill-white/30" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500 rounded-3xl blur-lg opacity-30 -z-10"></div>
                </motion.div>
                <div>
                  <h2 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                    PayFairy
                  </h2>
                  <p className="text-sm text-pink-400 font-medium">
                    ✨ Your adorable payment companion
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💸</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Smart Payment Tracking</h3>
                  <p className="text-gray-600 text-sm">
                    Keep track of all your payments with style and grace
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Bank-Level Security</h3>
                  <p className="text-gray-600 text-sm">
                    Your data is protected with enterprise-grade security
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎀</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Beautiful Interface</h3>
                  <p className="text-gray-600 text-sm">
                    Designed with love for the modern user
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative quote */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border-l-4 border-pink-400"
            >
              <p className="text-gray-700 italic text-sm">
                "Managing payments has never been this delightful! 💕"
              </p>
              <p className="text-xs text-gray-500 mt-1">- Happy PayFairy User</p>
            </motion.div>
          </div>

          {/* Login Form - Enhanced */}
          <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Header */}
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    variants={floatingHeartVariants}
                    animate="animate"
                    className="mr-3"
                  >
                    <Heart className="w-8 h-8 text-pink-400 fill-pink-200" />
                  </motion.div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                    Welcome Back!
                  </h1>
                  <motion.div variants={sparkleVariants} animate="animate" className="ml-3">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-200" />
                  </motion.div>
                </div>
                <p className="text-gray-600 font-medium">
                  We missed you, gorgeous! Ready to manage your payments? ✨
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div variants={itemVariants} className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Mail className="w-4 h-4 text-pink-400 mr-2" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-4 text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/40 rounded-3xl outline-none transition-all duration-300 placeholder-gray-400 group-hover:border-pink-300"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants} className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Lock className="w-4 h-4 text-purple-400 mr-2" />
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your secret password"
                      className="w-full px-4 py-4 pr-12 text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-200/40 rounded-3xl outline-none transition-all duration-300 placeholder-gray-400 group-hover:border-purple-300"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-teal-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full px-6 py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 hover:from-pink-500 hover:via-purple-500 hover:to-teal-500 text-white font-semibold rounded-3xl shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative flex items-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing you in...</span>
                          <Heart className="w-4 h-4 fill-white/20 animate-pulse" />
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5 fill-white/20" />
                          <span>Sign In</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div variants={itemVariants} className="text-center mt-8">
                <p className="text-gray-600">
                  New to our family?{" "}
                  <Link
                    to="/register"
                    className="font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent hover:from-pink-600 hover:via-purple-600 hover:to-teal-600 transition-all duration-300 relative"
                  >
                    Join us today!
                    <motion.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="inline-block ml-1"
                    >
                      💕
                    </motion.span>
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
