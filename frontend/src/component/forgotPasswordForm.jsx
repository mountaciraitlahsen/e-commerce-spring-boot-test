import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../hooks/useForgotPassword";
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { passwordReset, loading, error } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) return ;
    try {
      await passwordReset(email);
    } catch {
      throw error;
    }
    finally {
        setSubmitted(true);
    }
  };
  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
  };
  return (
    <>
      {submitted ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-[#0146FD] rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
            ✉️
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#111729]">
            Check your email
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed px-2">
            We have sent a password reset link to{" "}
            <span className="font-semibold text-gray-700">{email}</span>. Please
            check your inbox.
          </p>
          <div className="pt-4 space-y-3">
            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-[#0146FD] hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-[0.98]"
            >
              Resend email
            </button>
            <div>
              <Link
                to = "/api/auth/login"
                className="inline-block text-sm font-medium text-[#0146FD] hover:text-blue-700 hover:underline transition-colors mt-2"
              >
                Back to Log In
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#111729]">
              Forgot password?
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed px-1">
              Enter your email address associated with your account, and we'll
              email you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0146FD]/20 focus:border-[#0146FD] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#0146FD] hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending link...
                </>
              ) : (
                "Reset password"
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              to="/api/auth/login"
              className="text-sm font-medium text-[#0146FD] hover:text-blue-700 hover:underline transition-colors"
            >
              Back to Log In
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
