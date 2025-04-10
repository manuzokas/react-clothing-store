import { useState } from "react";
import { useSignIn, useAuth } from "@clerk/clerk-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "Reset Password" },
  ];

  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const { signOut } = useAuth();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Reset Password | eCompass";
      }, []);

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!signIn) {
        setError("Error resetting password. Please try again.");
        return;
      }

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await signOut();
        navigate("/reset-password-success");
        window.location.reload();
      } else {
        setError("Error resetting password.");
      }
    } catch (error: unknown) {
      setError("Invalid or expired code.");
      console.error("Erro ao redefinir senha:", error);
    }
  };

  return (
    <section className="flex flex-col bg-white mt-26">
      <div className="flex flex-col bg-gray-100 py-5 px-40">
        <h1 className="text-[24px] font-bold text-left">Reset Password</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col items-center justify-center py-30">
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col items-center justify-center gap-4"
        >
          <p className="text-left text-gray-600 w-85">
            Enter the verification code sent to your email and your new
            password.
          </p>

          <div className="flex flex-col gap-2 w-85">
            <label htmlFor="code" className="text-sm font-medium text-gray-700">
              Verification Code
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2 w-85">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
              <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-85 bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-700 transition duration-300"
          >
            Reset Password
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 w-85">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          <a
            href="/forgot-password"
            className="text-blue-500 hover:underline text-sm"
          >
            Didn't receive the code? Resend
          </a>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
