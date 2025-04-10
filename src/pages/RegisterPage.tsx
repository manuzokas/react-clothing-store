// src/pages/Register/index.tsx
import { RegisterForm } from "@/components/register/RegisterForm";
import { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

export default function RegisterPage() {
  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "Sign up" },
  ];

    useEffect(() => {
        document.title = "Register | eCompass";
      }, []);

  return (
    <section className="mt-26">
      <div className="flex flex-col items-start justify-start w-full py-8 px-30 bg-gray-100">
        <h1 className="text-[24px] font-bold">Sign up</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <RegisterForm />
    </section>
  );
}
