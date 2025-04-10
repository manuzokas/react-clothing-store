// src/components/NewsletterForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, NewsletterSchema } from "@/schemas/authSchema";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

const NewsletterForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
  });

 const onSubmit = async (data: NewsletterSchema) => {
   try {
     const response = await fetch("http://localhost:3001/newsletters", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });

     if (response.ok) {
    setSuccessMessage("Email successfully registered!");
       setErrorMessage(null);
     } else {
    setErrorMessage("Unable to register the email at this time.");
       setSuccessMessage(null);
     }
   } catch {
    setErrorMessage("Error trying to register the email.");
     setSuccessMessage(null);
   }
 };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
      className="flex flex-row items-start gap-4"
    >
      <div
        className={cn(
          theme === "dark" ? "text-white" : "text-black",
          "min-h-[80px]"
        )}
      >
        <input
          type="email"
          placeholder="Your email address"
          {...register("email")}
          className="border border-gray-300 w-80 px-4 py-2 rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={cn(
          "bg-black hover:bg-gray-700 text-white text-[14px] px-4 py-2 rounded-sm",
          theme === "dark"
            ? "bg-white/90 text-black hover:bg-white/50"
            : "bg-black"
        )}
      >
        Subscribe
      </button>
      {successMessage && (
        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

export default NewsletterForm;
