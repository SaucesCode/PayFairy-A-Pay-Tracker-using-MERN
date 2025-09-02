import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  UserCircle,
  FileText,
  Heart,
  Star,
  LogOut,
  Sparkles,
  Plus,
  Eye,
  TrendingUp,
} from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/"); // if not logged in → back to login
    } else {
      setRole(storedRole);
    }

    const fetchStats = async () => {
      try {
        const res = await api.get("/agreements/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, [navigate]);

  if (!role)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-purple-50 to-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-400 rounded-full animate-spin"></div>
          <div className="text-lg text-pink-600 font-medium">
            Loading your fairy tale... ✨
          </div>
        </div>
      </div>
    );

  // Logout handler
  const handleLogout = () => {
    toast.success("Bye bye! See you soon! 👋💕", {
      icon: "🌸",
      style: {
        borderRadius: "24px",
        background: "#A7F3D0",
        color: "#1F2937",
        fontWeight: "500",
      },
    });
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userInfo");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cream">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">PayFairy ✨</h1>
              <p className="text-gray-600">Welcome back, {role}!</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-3xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-md hover:from-pink-500 hover:to-pink-700 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-pink-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Total Agreements</h3>
                <p className="text-2xl font-bold text-pink-600">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Active Status</h3>
                <p className="text-2xl font-bold text-purple-600">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Completed</h3>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions 🚀</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Button */}
            <button
              onClick={() => navigate("/profile")}
              className="group bg-white rounded-3xl p-6 shadow-lg border border-pink-200 hover:shadow-pink-100/50 hover:border-pink-300 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">💕 View Profile</h3>
                  <p className="text-sm text-gray-600">Manage your personal info</p>
                </div>
              </div>
            </button>

            {/* Role-specific buttons */}
            {role === "payer" ? (
              <>
                <button
                  onClick={() => navigate("/create-agreement")}
                  className="group bg-white rounded-3xl p-6 shadow-lg border border-purple-200 hover:shadow-purple-100/50 hover:border-purple-300 transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        📝 Create Agreement
                      </h3>
                      <p className="text-sm text-gray-600">Start a new payment deal</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/agreements")}
                  className="group bg-white rounded-3xl p-6 shadow-lg border border-green-200 hover:shadow-green-100/50 hover:border-green-300 transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        📋 My Agreements
                      </h3>
                      <p className="text-sm text-gray-600">View all your deals</p>
                    </div>
                  </div>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/agreements")}
                className="group md:col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-purple-200 hover:shadow-purple-100/50 hover:border-purple-300 transition-all duration-200"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      📄 My Assigned Agreements
                    </h3>
                    <p className="text-sm text-gray-600">Check what needs your attention</p>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why PayFairy? ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-6 rounded-3xl border border-pink-200 text-center">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Easy Management</h3>
              <p className="text-sm text-gray-600">
                Simple & intuitive interface designed with love
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-3xl border border-purple-200 text-center">
              <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">
                Your money is safe with our fairy protection
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-3xl border border-green-200 text-center">
              <Sparkles className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Modern Design</h3>
              <p className="text-sm text-gray-600">
                Beautiful, magical & user-friendly experience
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-pink-100">
          <p className="text-gray-500 text-sm mb-2">Made with 💕 by PayFairy Team</p>
          <p className="text-gray-400 text-xs">
            Your magical payment companion • Always here to help ✨
          </p>
        </div>
      </div>
    </div>
  );
}
