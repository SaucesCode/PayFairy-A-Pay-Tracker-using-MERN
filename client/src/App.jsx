import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Agreements from "./pages/Agreement";
import Profile from "./pages/Profile";
import CreateAgreement from "./pages/CreateAgreement";
import AgreementDetailPage from "./pages/AgreementDetailPage";

function App() {
  const payerOrPayee = ["payer", "payee"];

  return (
    <div className="min-h-screen w-full relative font-inter">
      {/* Background - simplified for performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50 overflow-hidden">
        {/* Fewer, lighter animated blobs */}
        <div className="absolute top-16 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-50 animate-float will-change-transform"></div>
        <div className="absolute bottom-20 right-12 w-40 h-40 bg-purple-200 rounded-full opacity-50 animate-float-reverse will-change-transform"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/hearts-pattern.svg')] bg-[length:40px_40px]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen w-full overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <div className="animate-fade-in-gentle">
                  <LogIn />
                </div>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <div className="animate-fade-in-gentle">
                  <Register />
                </div>
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={payerOrPayee}>
                <div className="animate-slide-up-gentle">
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-agreement"
            element={
              <ProtectedRoute allowedRoles={["payer"]}>
                <div className="animate-slide-up-gentle">
                  <CreateAgreement />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agreements"
            element={
              <ProtectedRoute allowedRoles={payerOrPayee}>
                <div className="animate-slide-up-gentle">
                  <Agreements />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agreement/:id"
            element={
              <ProtectedRoute allowedRoles={payerOrPayee}>
                <div className="animate-slide-up-gentle">
                  <AgreementDetailPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={payerOrPayee}>
                <div className="animate-slide-up-gentle">
                  <Profile />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <style jsx>{`
        .font-inter {
          font-family: "Inter", "Poppins", system-ui, -apple-system, sans-serif;
        }

        @keyframes fade-in-gentle {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slide-up-gentle {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(10px) translateX(-5px);
          }
        }

        .animate-fade-in-gentle {
          animation: fade-in-gentle 0.6s ease-out;
        }

        .animate-slide-up-gentle {
          animation: slide-up-gentle 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }

        /* Remove global * { transition: all } */
        button,
        a,
        input {
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        /* Lightweight scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: #ec4899;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default App;
