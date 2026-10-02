import ResetPasswordCard from "../component/resetPasswordCard";
import { useSearchParams } from "react-router-dom";
export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  localStorage.setItem('reset-token', token);
  return (
    <>
      <div className="bg-[#FBFBFC] w-full h-full overflow-hidden flex justify-center items-center">
        <ResetPasswordCard token={token} />
      </div>
    </>
  );
}
