import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { newsletterSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewsletterSchema } from "@/schemas/authSchema";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "Forgot Password" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSignIn();

  const onSubmit = async (data: NewsletterSchema) => {
    try {
      if (!signIn) {
        setError("Unable to access the password recovery method.");
        return;
      }

      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      });

    setMessage(
      "If this email is registered, you will receive a link to reset your password."
    );
      setError("");
    } catch (err) {
    setError(
      "Error requesting password recovery. Please check the email and try again."
    );
      console.error(err);
    }
  };

  useEffect(() => {
      document.title = "Forgot Password | eCompass";
    }, []);

  return (
    <section className="flex flex-col bg-white mt-26">
      <div className="flex flex-col mb-6 bg-gray-100 py-5 px-40">
        <h1 className="text-[24px] font-bold text-left">Forgot Password</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col items-center justify-center py-30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <p className="text-left text-gray-600 w-85">
            Please enter the email address associated with your account. We'll
            promptly send you a link to reset your password.
          </p>

          {/* Campo de e-mail */}
          <div className="flex flex-col gap-2 w-85">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-85 bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-700 transition duration-300"
          >
            Send Reset Link
          </button>

          {message && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 w-85">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{message}</span>
            </div>
          )}

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
            href="/reset-password"
            className="text-blue-500 hover:underline text-sm"
          >
            Already received your code?
          </a>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
