import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import {
  FileText,
  Calendar,
  DollarSign,
  User,
  ArrowLeft,
  Sparkles,
  Info,
  Heart,
} from "lucide-react";

export default function CreateAgreement() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    payee: "",
    terms: "",
    totalAmount: "",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  console.log(token)

  const getUserId = () => {
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1])).id;
    } catch (e) {
      console.error("Failed to parse token:", e);
      return null;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payerId = getUserId();
    if (!payerId) {
      toast.error("You must be logged in to create an agreement.", {
        icon: "💔",
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          padding: "12px 20px",
          fontWeight: "600",
        },
      });
      return;
    }

    setIsLoading(true);
    const agreementData = { ...form, payer: payerId };

    const toastId = toast.loading("Creating agreement... ✨", {
      style: {
        background: "#F9A8D4",
        color: "#831843",
        borderRadius: "24px",
        padding: "12px 20px",
        fontWeight: "600",
      },
    });

    try {
      await api.post("/agreements", agreementData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Agreement created successfully! 🌸", {
        id: toastId,
        style: {
          background: "#A7F3D0",
          color: "#065F46",
          borderRadius: "24px",
          padding: "12px 20px",
          fontWeight: "600",
        },
      });
      navigate("/agreements");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create agreement 💔", {
        id: toastId,
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          padding: "12px 20px",
          fontWeight: "600",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simple animations following design system
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50 py-8 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-3xl flex items-center justify-center mr-3 shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Agreement</h1>
            <Sparkles className="w-6 h-6 text-pink-400 ml-3" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Set up your payment agreement with clear terms and secure conditions 🌸
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Tutorial Sidebar */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="bg-pink-50/80 backdrop-blur-sm rounded-3xl shadow-md border border-pink-200/60 p-6 lg:p-8 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-500 rounded-3xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-pink-800">How to Create Agreement</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-2xl border border-pink-200/40">
                  <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-pink-700">1</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-pink-700">Get Payee ID:</span> Ask
                      your payee for their ID (found in their profile dashboard)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-2xl border border-pink-200/40">
                  <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-pink-700">2</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-pink-700">Set Terms:</span> Write
                      clear agreement terms (e.g., "Monthly rent payment")
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-2xl border border-pink-200/40">
                  <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-pink-700">3</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-pink-700">Amount & Dates:</span>{" "}
                      Specify total amount and agreement duration
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-2xl border border-pink-200/40">
                  <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-pink-700">4</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-pink-700">Create:</span> Click the
                      create button to finalize your agreement
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border border-pink-200">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-semibold text-pink-700">Pro Tip</span>
                </div>
                <p className="text-xs text-pink-700">
                  Make sure all details are correct before creating. You can always view and
                  manage your agreements later!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-pink-200/60 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <FileText className="w-7 h-7 text-white mr-2" />
                  <Sparkles className="w-5 h-5 text-pink-200" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Agreement Details</h2>
                <p className="text-pink-100 text-sm">
                  Fill out all fields to create your agreement
                </p>
              </div>

              {/* Form */}
              <div className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payee ID */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4 text-pink-400 mr-2" />
                      Payee ID
                    </label>
                    <input
                      type="text"
                      value={form.payee}
                      onChange={e => setForm({ ...form, payee: e.target.value })}
                      placeholder="Enter payee ID"
                      className="w-full px-5 py-3 text-gray-800 bg-pink-50/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 focus:bg-white transition-all duration-200 placeholder-gray-400"
                      required
                    />
                  </motion.div>

                  {/* Terms */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <FileText className="w-4 h-4 text-pink-400 mr-2" />
                      Agreement Terms
                    </label>
                    <input
                      type="text"
                      value={form.terms}
                      onChange={e => setForm({ ...form, terms: e.target.value })}
                      placeholder="e.g., Monthly rent payment"
                      className="w-full px-5 py-3 text-gray-800 bg-pink-50/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 focus:bg-white transition-all duration-200 placeholder-gray-400"
                      required
                    />
                  </motion.div>

                  {/* Total Amount */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <DollarSign className="w-4 h-4 text-pink-400 mr-2" />
                      Total Amount
                    </label>
                    <input
                      type="number"
                      value={form.totalAmount}
                      onChange={e => setForm({ ...form, totalAmount: e.target.value })}
                      placeholder="e.g., 1200"
                      className="w-full px-5 py-3 text-gray-800 bg-pink-50/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 focus:bg-white transition-all duration-200 placeholder-gray-400"
                      required
                    />
                  </motion.div>

                  {/* Date Fields */}
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Calendar className="w-4 h-4 text-pink-400 mr-2" />
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={form.startDate}
                        onChange={e => setForm({ ...form, startDate: e.target.value })}
                        className="w-full px-5 py-3 text-gray-800 bg-pink-50/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 focus:bg-white transition-all duration-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Calendar className="w-4 h-4 text-pink-400 mr-2" />
                        End Date
                      </label>
                      <input
                        type="date"
                        value={form.endDate}
                        onChange={e => setForm({ ...form, endDate: e.target.value })}
                        className="w-full px-5 py-3 text-gray-800 bg-pink-50/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 focus:bg-white transition-all duration-200"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div variants={itemVariants} className="space-y-4 pt-4">
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 rounded-3xl bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white font-semibold shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating Agreement...</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 fill-white/20" />
                          <span>Create Agreement</span>
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full px-6 py-3 rounded-3xl border-2 border-pink-200 bg-pink-50/50 hover:bg-pink-100/50 text-gray-700 font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Dashboard</span>
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
