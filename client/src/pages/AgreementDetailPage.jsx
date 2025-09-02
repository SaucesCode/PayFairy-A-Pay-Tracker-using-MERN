import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { formatDate } from "../utils/formatDate";
import {
  FileText,
  User,
  DollarSign,
  Calendar,
  TrendingUp,
  Upload,
  Check,
  X,
  Heart,
  Sparkles,
  CreditCard,
  Camera,
  Clock,
} from "lucide-react";

export default function AgreementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agreement, setAgreement] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);

  const fetchAgreement = async () => {
    try {
      const agreementRes = await api.get(`/agreements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgreement(agreementRes.data);
    } catch (error) {
      console.error("Failed to fetch agreement", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAgreement(); // load agreement
      try {
        const payRes = await api.get(`/payments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(payRes.data);
      } catch (error) {
        console.error("Failed to fetch payments", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, token]);

  // Create a payment
  const handleCreatePayment = async e => {
    e.preventDefault();
    if (!agreement || !selectedFile || !amount) {
      toast.error("Please provide amount and select a file 💔", {
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
      return;
    }

    if (user?._id !== agreement.payer._id || agreement.status !== "active") {
      toast.error("You cannot create a payment for this agreement 💔", {
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("agreementId", id);
    formData.append("payer", agreement.payer._id);
    formData.append("payee", agreement.payee._id);
    formData.append("amount", amount);
    formData.append("note", note);
    formData.append("image", selectedFile);

    const toastId = toast.loading("Creating payment... ✨", {
      style: {
        background: "#F9A8D4",
        color: "#1F2937",
        borderRadius: "24px",
        fontWeight: "500",
      },
    });

    try {
      setLoading(true);
      await api.post("/payments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const payRes = await api.get(`/payments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(payRes.data);
      setAmount("");
      setNote("");
      setSelectedFile(null);

      toast.success("Payment submitted successfully! 🌸", {
        id: toastId,
        style: {
          background: "#A7F3D0",
          color: "#1F2937",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
    } catch (error) {
      console.error("Failed to create payment", error.response?.data || error.message);
      toast.error("Failed to create payment 💔", {
        id: toastId,
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Confirm / Reject
  const handleConfirm = async paymentId => {
    const toastId = toast.loading("Confirming payment... ✨", {
      style: {
        background: "#F9A8D4",
        color: "#1F2937",
        borderRadius: "24px",
        fontWeight: "500",
      },
    });
    try {
      setLoading(true);
      await api.put(
        `/payments/${paymentId}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const payRes = await api.get(`/payments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(payRes.data);
      await fetchAgreement();
      toast.success("Payment confirmed! 🌸", {
        id: toastId,
        style: {
          background: "#A7F3D0",
          color: "#1F2937",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
    } catch (err) {
      console.error("Failed to confirm payment", err);
      toast.error("Failed to confirm payment 💔", {
        id: toastId,
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async paymentId => {
    const toastId = toast.loading("Processing rejection... ✨", {
      style: {
        background: "#F9A8D4",
        color: "#1F2937",
        borderRadius: "24px",
        fontWeight: "500",
      },
    });
    try {
      setLoading(true);
      await api.put(
        `/payments/${paymentId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const payRes = await api.get(`/payments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(payRes.data);
      await fetchAgreement();

      toast.error("Payment rejected 💔", {
        id: toastId,
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
    } catch (err) {
      console.error("Failed to reject payment", err);
      toast.error("Failed to reject payment 💔", {
        id: toastId,
        style: {
          background: "#EC4899",
          color: "#fff",
          borderRadius: "24px",
          fontWeight: "500",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (!agreement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cream flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-pink-400 mx-auto animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading agreement... ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cream p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-pink-200 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-white mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Agreement Details</h1>
                  <p className="text-pink-100 text-sm">Manage your payment agreement</p>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-3xl text-sm font-semibold ${
                  agreement.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {agreement.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Agreement Info */}
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-pink-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Payer</p>
                  <p className="font-semibold text-gray-800">{agreement.payer?.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 text-purple-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Payee</p>
                  <p className="font-semibold text-gray-800">{agreement.payee?.name}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-pink-400 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Terms</p>
                  <p className="font-medium text-gray-800">{agreement.terms}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-lg text-gray-800">
                    ₱{agreement.totalAmount?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-pink-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Total Paid</p>
                  <p className="font-bold text-lg text-pink-600">
                    ₱{agreement.totalPaid?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-pink-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Payment Progress</span>
              </div>
              <span className="text-sm font-bold text-pink-600">
                {agreement.progress?.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-pink-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-pink-400 to-pink-600 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${agreement.progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Payment Form */}
        {user?._id === agreement.payer?._id && agreement.status === "active" && (
          <div className="bg-white rounded-3xl shadow-lg border border-pink-200 p-6">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-pink-400 mr-3" />
              <h2 className="text-xl font-bold text-gray-800">💕 Create New Payment</h2>
            </div>

            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <DollarSign className="w-4 h-4 text-pink-400 mr-2" />
                    Amount (₱)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 text-gray-800 bg-cream/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:bg-white transition-all duration-200 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-pink-400 mr-2" />
                    Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full px-4 py-3 text-gray-800 bg-cream/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:bg-white transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Camera className="w-4 h-4 text-pink-400 mr-2" />
                  Payment Proof
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={e => setSelectedFile(e.target.files[0])}
                    required
                    className="w-full px-4 py-3 text-gray-800 bg-cream/50 border-2 border-pink-200 rounded-3xl outline-none focus:border-pink-400 focus:bg-white transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                </div>
              </div>

              <button
                onClick={handleCreatePayment}
                disabled={loading}
                className="w-full px-5 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold rounded-3xl shadow-md hover:from-pink-500 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    💸 Submit Payment
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Payments List */}
        <div className="bg-white rounded-3xl shadow-lg border border-pink-200 p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-pink-400 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">💰 Payment History</h2>
          </div>

          {payments.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-pink-200 mx-auto mb-4" />
              <p className="text-gray-500">
                No payments yet. Start by creating your first payment! 💕
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments
                .slice(0)
                .reverse()
                .map(p => (
                  <div
                    key={p._id}
                    className="bg-cream/30 border border-pink-100 rounded-3xl p-5"
                  >
                    <div className="grid md:grid-cols-3 gap-4 items-start">
                      {/* Payment Details */}
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                          <span className="font-bold text-lg text-gray-800">₱{p.amount}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-pink-400 mr-2" />
                          <span className="text-sm text-gray-600">{p.note || "No note"}</span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              p.status === "confirmed"
                                ? "bg-green-400"
                                : p.status === "pending"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            }`}
                          ></div>
                          <span
                            className={`text-sm font-semibold capitalize ${
                              p.status === "confirmed"
                                ? "text-green-600"
                                : p.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-pink-400 mr-2" />
                          <div>
                            <p className="text-gray-500">Submitted</p>
                            <p className="font-medium">{formatDate(p.createdAt)}</p>
                          </div>
                        </div>
                        {p.status !== "pending" && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                            <div>
                              <p className="text-gray-500">Updated</p>
                              <p className="font-medium">{formatDate(p.updatedAt)}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Payment Proof & Actions */}
                      <div className="space-y-3">
                        {p.image && (
                          <img
                            src={`http://localhost:5000${p.image}`}
                            alt="Payment proof"
                            className="w-32 h-32 object-cover rounded-2xl border-2 border-pink-200"
                          />
                        )}

                        {/* Payee Actions */}
                        {user?._id === agreement.payee?._id &&
                          p.status.toLowerCase() === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleConfirm(p._id)}
                                disabled={loading}
                                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-3xl transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Confirm
                              </button>
                              <button
                                onClick={() => handleReject(p._id)}
                                disabled={loading}
                                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-3xl transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
