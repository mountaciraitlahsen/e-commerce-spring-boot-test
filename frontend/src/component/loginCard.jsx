import LoginForm from "./loginForm";
import { Link } from "react-router-dom";
export default function LoginCard() {
  return (
    <>
      <div className="bg-[#FFFFFF] w-126 h-auto rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex-col flex items-center pt-10 pb-4">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-2 text-3xl font-bold tracking-tight text-[#111729]">
            <span className="text-blue-600 text-3xl">🛒</span>
            <span>Shop</span>
            <span className="text-[#0146FD]">Easy</span>
          </div>

          <h2 className="text-2xl font-bold text-[#111729] mt-4">
            Welcome back
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Sign in to your account to continue shopping
          </p>
        </div>
        <LoginForm></LoginForm>
        <div className="w-full flex flex-col items-center gap-2 mt-2 px-7 pb-2">
          <Link
            to="/forgot-password"
            className="text-xs text-blue-600 hover:underline font-semibold"
          >
            Forgot your password?
          </Link>

          <div className="w-full flex items-center my-1">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <Link
            to="/register"
            className="w-full py-2.5 text-center text-sm font-medium text-[#0146FD] bg-white border border-[#0146FD] rounded-lg hover:bg-[#0146FD] hover:text-white transition-colors block"
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}
