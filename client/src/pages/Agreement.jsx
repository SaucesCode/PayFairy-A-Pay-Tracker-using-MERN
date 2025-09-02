import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  User,
  DollarSign,
  Calendar,
  Plus,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyAgreements() {
  const [agreements, setAgreements] = useState([]);
  const token = localStorage.getItem("token");
  const userId = getUserId(); // helper function below
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchAgreements = async () => {
    setLoading(true);
    try {
      const res = await api.get("/agreements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgreements(res.data);
    } catch (err) {
      console.error("Error fetching agreements:", err);
      toast.error("Failed to fetch agreements! 💔", {
        icon: "🌸",
        style: {
          borderRadius: "24px",
          background: "#FEE2E2",
          color: "#991B1B",
          fontWeight: "500",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAgreements();
    }
  }, [token]);

  const handleAction = async (id, action) => {
    const toastId = toast.loading(`Updating agreement...`);
    try {
      await api.put(
        `/agreements/${id}/${action}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(
        `Agreement ${action}ed successfully! ${action === "confirm" ? "💕" : "🌸"}`,
        {
          id: toastId,
          style: {
            borderRadius: "24px",
            background: "#A7F3D0",
            color: "#1F2937",
            fontWeight: "500",
          },
        }
      );
      fetchAgreements(); // Refresh the list
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
      toast.error(`Failed to ${action} agreement 💔`, {
        id: toastId,
        style: {
          borderRadius: "24px",
          background: "#FEE2E2",
          color: "#991B1B",
          fontWeight: "500",
        },
      });
    }
  };

  const getStatusIcon = status => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-600 bg-green-100 border-green-200";
      case "rejected":
        return "text-red-600 bg-red-100 border-red-200";
      case "pending":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-purple-50 to-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-400 rounded-full animate-spin"></div>
          <div className="text-lg text-pink-600 font-medium">
            Loading your agreements... ✨
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cream">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-pink-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Agreements ✨</h1>
              <p className="text-gray-600">Manage your payment deals</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-800">Active</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {agreements.filter(a => a.status === "active").length}
            </p>
            <p className="text-sm text-gray-500">Confirmed agreements</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-yellow-500" />
              <h3 className="font-semibold text-gray-800">Pending</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {agreements.filter(a => a.status === "pending").length}
            </p>
            <p className="text-sm text-gray-500">Awaiting response</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-gray-800">Rejected</h3>
            </div>
            <p className="text-2xl font-bold text-red-600">
              {agreements.filter(a => a.status === "rejected").length}
            </p>
            <p className="text-sm text-gray-500">Declined deals</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold text-gray-800">Total</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{agreements.length}</p>
            <p className="text-sm text-gray-500">All agreements</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => navigate("/create-agreement")}
            className="flex items-center gap-2 px-6 py-3 rounded-3xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-pink-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create New Agreement
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-3xl bg-white text-gray-700 font-semibold shadow-md hover:shadow-lg border border-pink-200 transition-all duration-200"
          >
            <Eye className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Agreements List */}
        {agreements.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No agreements yet! 🌸</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start creating magical payment agreements and manage your deals with ease.
            </p>
            <button
              onClick={() => navigate("/create-agreement")}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold rounded-3xl shadow-lg hover:from-pink-500 hover:to-pink-700 transition-all duration-200"
            >
              Create Your First Agreement ✨
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {agreements.map(agreement => (
              <div
                key={agreement._id}
                className="bg-white rounded-3xl shadow-lg p-6 border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-200"
              >
                {/* Agreement Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <Link to={`/agreement/${agreement._id}`}>
                        <h3 className="text-xl font-bold text-gray-800 hover:text-pink-600 transition-colors mb-2">
                          {agreement.terms}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(agreement.status)}
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                            agreement.status
                          )}`}
                        >
                          {agreement.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-800 mb-1">
                      ₱ {agreement.totalAmount}
                    </p>
                    <p className="text-sm text-gray-500">Total Amount</p>
                  </div>
                </div>

                {/* Agreement Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-pink-500" />
                      <span className="text-sm font-semibold text-pink-600">Payer</span>
                    </div>
                    <p className="font-medium text-gray-800">
                      {agreement.payer?.name || "N/A"}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-semibold text-purple-600">Payee</span>
                    </div>
                    <p className="font-medium text-gray-800">
                      {agreement.payee?.name || "N/A"}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-blue-600">Created</span>
                    </div>
                    <p className="font-medium text-gray-800 text-sm">
                      {formatDate(agreement.createdAt)}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-600">Amount</span>
                    </div>
                    <p className="font-medium text-gray-800">₱ {agreement.totalAmount}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {agreement.status?.toLowerCase() === "pending" &&
                  agreement.payee?._id === userId && (
                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleAction(agreement._id, "confirm")}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-3xl font-semibold shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-200"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Confirm Agreement
                      </button>
                      <button
                        onClick={() => handleAction(agreement._id, "reject")}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-3xl font-semibold shadow-lg hover:from-red-500 hover:to-red-700 transition-all duration-200"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject Agreement
                      </button>
                    </div>
                  )}

                {/* View Details Link */}
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <Link
                    to={`/agreement/${agreement._id}`}
                    className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold text-sm transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Full Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-12 border-t border-pink-100 mt-12">
          <p className="text-gray-500 text-sm mb-2">Made with 💕 by PayFairy Team</p>
          <p className="text-gray-400 text-xs">
            Your magical payment companion • Always here to help ✨
          </p>
        </div>
      </div>
    </div>
  );
}

/* 🔑 Helper: Decode JWT to get userId */
function getUserId() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || payload._id;
  } catch {
    return null;
  }
}
