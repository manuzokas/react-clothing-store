import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Cart from "@/components/cartpage/Cart";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

export default function CartPage() {
  const { theme } = useTheme();

  useEffect(() => {
      document.title = "Cart | eCompass";
    }, []);

  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "Cart"},
  ];
  return (
    <section className="mt-26">
      {/* Breadcrumb */}
      <div className={cn("flex flex-col items-start justify-start w-full py-5 px-15 md:py-8 md:px-30", theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100")}>
        <h1 className="text-[24px] font-bold">Cart</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Cart />
    </section>
  );
}
