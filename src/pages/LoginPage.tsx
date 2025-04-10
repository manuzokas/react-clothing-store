// src/pages/Login/index.tsx
import { LoginForm } from "@/components/login/LoginForm";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useEffect } from "react";

export default function LoginPage() {
  
    useEffect(() => {
        document.title = "Login | eCompass";
      }, []);

   const breadcrumbItems = [
     { label: "Ecommerce", href: "/" },
     { label: "Login" },
   ];
  return (
    <section className="mt-26">
      <div className="flex flex-col items-start justify-start w-full py-8 px-30 bg-gray-100">
        <h1 className="text-[24px] font-bold">Login</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
        <LoginForm />
      
    </section>
  );
}
