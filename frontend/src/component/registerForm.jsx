import { useState } from "react";
// import { Link } from "react-router-dom";
// import { usePasswordReset } from "../hooks/usePasswordReset";
export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState("signup"); // 'signup' or 'login'

  const isFormValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    agreed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Simulate successful account creation
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setAgreed(false);
    setIsSubmitted(false);
    setCurrentView("signup");
  };
  return (
    <>
      {isSubmitted ? (
        <div className="w-full flex flex-col items-center py-8 text-center animate-fadeIn">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">
            🎉
          </div>
          <h1 className="text-2xl font-bold text-[#111729] mb-2">
            Account Created!
          </h1>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Welcome to Shop Easy,{" "}
            <span className="font-semibold text-gray-800">{fullName}</span>!
            Your account has been successfully created.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3 px-4 bg-[#0146FD] hover:bg-[#013dd6] text-white font-medium rounded-lg shadow-md transition-all duration-200 text-sm"
          >
            Start Shopping Now
          </button>
        </div>
      ) : currentView === "signup" ? (
        <>
          <h1 className="text-xl font-semibold text-[#111729] mb-1">
            Create an account
          </h1>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Sign up to start shopping and enjoy special offers.
          </p>

          {}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {/* Full Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g., John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0146FD]/20 focus:border-[#0146FD] transition-all"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0146FD]/20 focus:border-[#0146FD] transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Create password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0146FD]/20 focus:border-[#0146FD] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none text-sm"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 mt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0146FD] focus:ring-[#0146FD] cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-600 leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#terms"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#0146FD] hover:underline font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#0146FD] hover:underline font-medium"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full mt-2 py-3 px-4 font-medium rounded-lg shadow-md transition-all duration-200 text-sm ${
                isFormValid
                  ? "bg-[#0146FD] hover:bg-[#013dd6] text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              Sign Up
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold text-[#111729] mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Sign in to your account to continue shopping
          </p>
          <div className="w-full text-center py-6 text-sm text-gray-600">
            (Login view placeholder)
          </div>
        </>
      )}

      {}
      {!isSubmitted && (
        <>
          <div className="w-full flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 uppercase tracking-wider">
              or
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrentView(currentView === "signup" ? "login" : "signup")
            }
            className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-[#0146FD] border border-gray-300 font-medium rounded-lg transition-all duration-200 text-sm cursor-pointer"
          >
            {currentView === "signup"
              ? "Log in to an existing account"
              : "Create a new account"}
          </button>
        </>
      )}
    </>
  );
}
