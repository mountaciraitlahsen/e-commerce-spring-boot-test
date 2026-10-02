import { useState } from "react";
import { Link } from "react-router-dom";
export default function ResetPasswordForm() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if(!email) return ;
  //     try {
  //       await passwordReset(email);
  //     } catch {
  //       throw error;
  //     }
  //     finally {
  //         setSubmitted(true);
  //     }
  //   };
  return (
    <>
      {success ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-[#0146FD] rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
            🔒
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#111729]">
            Password updated
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed px-2">
            Your password has been successfully updated. You can now sign in to
            your account with your new credentials.
          </p>
          <div className="pt-4">
            <Link
              to="/api/auth/login"
              className="w-full block py-3 px-4 bg-[#0146FD] hover:bg-blue-700 text-white font-medium text-center rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-[0.98]"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#111729]">
              Reset password
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed px-1">
              Please enter your new password below. Make sure it's secure and
              easy for you to remember.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center font-medium animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                New password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0146FD]/20 focus:border-[#0146FD] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Confirm new password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0146FD]/20 focus:border-[#0146FD] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-[#0146FD] hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-75"
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
                  Updating password...
                </>
              ) : (
                "Update password"
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
