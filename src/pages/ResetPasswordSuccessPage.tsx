import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useEffect } from "react";

const ResetPasswordSuccessPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/sign-in?reset=success");
  };

  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "Reset Password Success" },
  ];

    useEffect(() => {
        document.title = "Password Sucess | eCompass";
      }, []);

  return (
    <section className="flex flex-col bg-white mt-26">
      <div className="flex flex-col mb-6 bg-gray-100 py-5 px-40">
        <h1 className="text-[24px] font-bold text-left">
          Reset Password Success
        </h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col items-center justify-center py-40">
        <div className="flex flex-col items-center justify-center gap-6 w-85">
          {/* Ícone de sucesso */}
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>

          <h2 className="text-2xl font-bold text-black">
            Password Reset Successful!
          </h2>
          <p className="text-center text-gray-600">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>

          <button
            onClick={handleButtonClick}
            className="w-full bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordSuccessPage;