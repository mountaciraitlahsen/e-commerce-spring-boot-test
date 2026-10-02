import ResetPasswordForm from "./resetPasswordForm";

export default function ForgotPasswordCard() {
  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 selection:bg-blue-100 selection:text-blue-700">
        <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 p-8 sm:p-10 transition-all duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 text-3xl font-bold tracking-tight text-[#111729] pr-2">
              <span className="text-blue-600 text-3xl">🛒</span>
              <span>Shop</span>
              <span className="text-[#0146FD]">Easy</span>
            </div>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
}
