import RegisterForm from "./registerForm";

export default function RegisterCard() {
  return (
    <>
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 flex flex-col items-center">
          <div className="flex items-center gap-2 text-3xl font-bold tracking-tight text-[#111729] mb-2">
            <span className="text-blue-600 text-3xl">🛒</span>
            <span>Shop</span>
            <span className="text-[#0146FD]">Easy</span>
          </div>

          <RegisterForm />
        </div>
      </div>
    </>
  );
}
