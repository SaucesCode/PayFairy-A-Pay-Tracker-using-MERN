import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Copy, Check, ArrowLeft, Heart, Star } from "lucide-react";
import api from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCopy = () => {
    if (profile?._id) {
      navigator.clipboard.writeText(profile._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-lavender-50 to-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-400 rounded-full animate-spin"></div>
          <div className="text-lg text-gray-600 font-medium">Loading your profile... ✨</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-lavender-50 to-cream">
        <div className="p-6 bg-white rounded-3xl shadow-lg border border-pink-200">
          <div className="text-lg text-red-500 font-medium mb-4">💔 {error}</div>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-3xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-md hover:from-pink-500 hover:to-pink-700 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cream p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-pink-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Profile 💕</h1>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-pink-200 p-8 mb-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <UserCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome back, {profile?.name}! ✨
              </h2>
              <p className="text-gray-600">Managing your PayFairy account</p>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Personal Info
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100">
                  <label className="text-sm font-medium text-pink-600 mb-1 block">
                    Full Name
                  </label>
                  <p className="text-gray-800 font-medium">{profile?.name}</p>
                </div>

                <div className="p-4 bg-lavender-50 rounded-2xl border border-purple-100">
                  <label className="text-sm font-medium text-purple-600 mb-1 block">
                    Email Address
                  </label>
                  <p className="text-gray-800 font-medium">{profile?.email}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <label className="text-sm font-medium text-green-600 mb-1 block">
                    Account Role
                  </label>
                  <p className="text-gray-800 font-medium capitalize">{profile?.role}</p>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Account Details
              </h3>

              <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                <label className="text-sm font-medium text-yellow-600 mb-2 block">
                  User ID
                </label>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-gray-700 bg-white px-3 py-1 rounded-lg border flex-1 font-mono text-xs break-all">
                    {profile?._id}
                  </code>
                  <button
                    onClick={handleCopy}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      copied
                        ? "bg-green-100 text-green-600"
                        : "bg-white hover:bg-pink-50 text-gray-600 hover:text-pink-600"
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Copied to clipboard! 🎉
                  </p>
                )}
              </div>

              {/* Stats Card */}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 px-6 py-3 rounded-3xl bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold shadow-md hover:from-pink-500 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            ✨ Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
