import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Sparkles,
  Heart,
  UserPlus,
  CreditCard,
  Banknote,
  Eye,
  EyeOff,
  Star,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "payer" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("✨ Creating your magical account...");

    try {
      await api.post("/auth/register", form);
      toast.success("🎉 Welcome to PayFairy! Please log in to continue.", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "💔 Registration failed, please try again", {
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

  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
        scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      x: [-2, 2, -2],
      rotate: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const roleCardVariants = {
    unselected: {
      scale: 1,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    selected: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)",
    },
    hover: {
      scale: 1.01,
      boxShadow: "0 8px 20px rgba(236, 72, 153, 0.2)",
    },
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
          variants={floatingVariants}
          animate="animate"
          className="absolute top-16 left-8 w-6 h-6 text-pink-300 opacity-60"
        >
          <Heart className="w-full h-full fill-current" />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          className="absolute top-24 right-12 w-5 h-5 text-purple-300 opacity-60"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute bottom-24 left-16 w-4 h-4 text-teal-300 opacity-60"
        >
          <Star className="w-full h-full fill-current" />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-32 right-8 w-5 h-5 text-pink-400 opacity-60"
        >
          <UserPlus className="w-full h-full" />
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl h-full relative flex"
      >
        {/* Glassmorphism container with enhanced styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-purple-50/40 to-teal-50/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300/30 via-purple-300/30 via-teal-300/30 to-pink-300/30 bg-[length:200%_100%] animate-gradient-x rounded-3xl p-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl h-full w-full" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row rounded-3xl h-full w-full overflow-hidden">
          {/* Welcome Side Content - Enhanced */}
          <div className="hidden lg:flex flex-col justify-center items-start lg:w-1/2 p-8 xl:p-12 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-lg mr-4 relative"
                >
                  <UserPlus className="w-7 h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500 rounded-3xl blur-lg opacity-30 -z-10"></div>
                </motion.div>
                <div>
                  <h2 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                    PayFairy
                  </h2>
                  <p className="text-sm text-pink-400 font-medium">
                    ✨ Join our magical community
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Lightning Fast Setup</h3>
                  <p className="text-gray-600 text-sm">
                    Get started in under 30 seconds with our streamlined process
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Privacy First</h3>
                  <p className="text-gray-600 text-sm">
                    Your personal information is encrypted and secure
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Growing Community</h3>
                  <p className="text-gray-600 text-sm">
                    Join thousands of happy users managing payments beautifully
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced decorative quote */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-pink-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400"></div>
              <p className="text-gray-700 italic text-sm mb-2">
                "PayFairy transformed how I manage my payments. It's not just functional, it's
                absolutely delightful!"
              </p>
              <p className="text-xs text-gray-500 font-medium">- Sarah M., Happy User</p>
            </motion.div>
          </div>

          {/* Register Form - Enhanced */}
          <div className="flex-1 flex items-center justify-center p-32 xl:p-4  sm:p-8 lg:p-12 overflow-auto">
            <div className="w-full max-w-md">
              {/* Header */}
              <motion.div className="text-center mb-6" variants={itemVariants}>
                <div className="flex items-center justify-center mb-2">
                  <motion.div variants={sparkleVariants} animate="animate" className="mr-3">
                    <Sparkles className="w-8 h-8 text-pink-400 fill-pink-200" />
                  </motion.div>
                  <h1 className="text-3xl font-bold text-gray-800">Join PayFairy!</h1>
                  <motion.div variants={floatingVariants} animate="animate" className="ml-3">
                    <Heart className="w-6 h-6 text-purple-400 fill-purple-200" />
                  </motion.div>
                </div>
                <p className="text-gray-600 font-medium">
                  Create your gorgeous account and start your journey ✨
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <motion.div variants={itemVariants} className="form-group">
                  <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <User className="w-4 h-4 text-pink-400 mr-2" />
                    Full Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Your beautiful name"
                      className="w-full px-3 py-3 text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/40 rounded-3xl outline-none transition-all duration-300 placeholder-gray-400 group-hover:border-pink-300"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants} className="form-group">
                  <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Mail className="w-4 h-4 text-purple-400 mr-2" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-3 text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-200/40 rounded-3xl outline-none transition-all duration-300 placeholder-gray-400 group-hover:border-purple-300"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-teal-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants} className="form-group">
                  <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Lock className="w-4 h-4 text-teal-400 mr-2" />
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      className="w-full px-3 py-3 pr-12 text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-teal-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-200/40 rounded-3xl outline-none transition-all duration-300 placeholder-gray-400 group-hover:border-teal-300"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-pink-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Role Selection - Enhanced */}
                <motion.div variants={itemVariants} className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Choose Your Role
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      variants={roleCardVariants}
                      initial="unselected"
                      animate={form.role === "payer" ? "selected" : "unselected"}
                      whileHover="hover"
                      className={`relative p-2 border-2 rounded-3xl cursor-pointer transition-all duration-300 ${
                        form.role === "payer"
                          ? "border-pink-400 bg-gradient-to-br from-pink-50/80 to-pink-100/60"
                          : "border-gray-200 bg-white/60 hover:border-pink-300"
                      }`}
                      onClick={() => setForm({ ...form, role: "payer" })}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="payer"
                        checked={form.role === "payer"}
                        onChange={e => setForm({ ...form, role: e.target.value })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div
                          className={`w-10 h-10 mx-auto mb-2 rounded-2xl flex items-center justify-center ${
                            form.role === "payer" ? "bg-pink-200" : "bg-gray-100"
                          }`}
                        >
                          <CreditCard
                            className={`w-5 h-5 ${
                              form.role === "payer" ? "text-pink-600" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <span
                          className={`font-semibold text-sm block ${
                            form.role === "payer" ? "text-pink-700" : "text-gray-600"
                          }`}
                        >
                          💳 Payer
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Make payments</p>
                      </div>
                      {form.role === "payer" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center"
                        >
                          <Heart className="w-3 h-3 text-white fill-white" />
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      variants={roleCardVariants}
                      initial="unselected"
                      animate={form.role === "payee" ? "selected" : "unselected"}
                      whileHover="hover"
                      className={`relative p-4 border-2 rounded-3xl cursor-pointer transition-all duration-300 ${
                        form.role === "payee"
                          ? "border-purple-400 bg-gradient-to-br from-purple-50/80 to-purple-100/60"
                          : "border-gray-200 bg-white/60 hover:border-purple-300"
                      }`}
                      onClick={() => setForm({ ...form, role: "payee" })}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="payee"
                        checked={form.role === "payee"}
                        onChange={e => setForm({ ...form, role: e.target.value })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div
                          className={`w-10 h-10 mx-auto mb-2 rounded-2xl flex items-center justify-center ${
                            form.role === "payee" ? "bg-purple-200" : "bg-gray-100"
                          }`}
                        >
                          <Banknote
                            className={`w-5 h-5 ${
                              form.role === "payee" ? "text-purple-600" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <span
                          className={`font-semibold text-sm block ${
                            form.role === "payee" ? "text-purple-700" : "text-gray-600"
                          }`}
                        >
                          💰 Payee
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Receive payments</p>
                      </div>
                      {form.role === "payee" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center"
                        >
                          <Star className="w-3 h-3 text-white fill-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-3 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 hover:from-pink-500 hover:via-purple-500 hover:to-teal-500 text-white font-semibold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative flex items-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating magic...</span>
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Create Account</span>
                          <Heart className="w-4 h-4 fill-white/20" />
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div variants={itemVariants} className="text-center mt-6">
                <p className="text-gray-600">
                  Already part of our family?{" "}
                  <Link
                    to="/"
                    className="font-semibold text-pink-600 hover:text-pink-700 transition-all duration-300 relative"
                  >
                    Welcome back!
                    <motion.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                      className="inline-block ml-1"
                    >
                      ✨
                    </motion.span>
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom CSS */}
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
