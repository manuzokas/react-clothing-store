import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { Truck, Award, Shield } from "lucide-react";


export default function SecondSection() {
  const { theme } = useTheme();
  return (
    <section
      className={cn(
        "flex flex-col justify-center items-center h-screen md:h-[440px]",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* div que organiza horizontalmente todos os cards */}
      <div className="flex flex-col gap-15 md:flex-row items-center justify-center w-60 md:w-250 md:gap-40">
        {/* div 1 com icone, texto e paragrafo */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <Truck
            className={cn(
              "w-[48px] h-[48px] hover:text-blue-500 p-3 rounded-full",
              theme === "dark" ? "bg-white/50" : "bg-gray-100"
            )}
          />
          <h2 className="text16pxpx] font-bold mt-5">Free Shipping</h2>
          <p
            className={cn(
              "text-[14px] font-[200] mt-2",
              theme === "dark" ? "text-gray-400" : "text-gray-700"
            )}
          >
            Upgrade your style today and get FREE shipping on all orders! Don't
            miss out.
          </p>
        </div>

        {/* div 2 com icone, texto e paragrafo */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <Award
            className={cn(
              "hover:text-yellow-300 w-[48px] h-[48px] p-3 rounded-full",
              theme === "dark" ? "bg-white/50" : "bg-gray-100"
            )}
          ></Award>
          <h2 className="text-[16px] font-bold mt-5">Satisfaction Guarantee</h2>
          <p
            className={cn(
              "text-[14px] font-[200] mt-2",
              theme === "dark" ? "text-gray-400" : "text-gray-700"
            )}
          >
            Shop confidently with our Satisfaction Guarantee: Love it or get a
            refund.
          </p>
        </div>

        {/* div 3 com icone, texto e paragrafo */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <Shield
            className={cn(
              "bg-gray-100 hover:text-green-500 w-[48px] h-[48px] rounded-full p-3",
              theme === "dark" ? "bg-white/50" : "bg-gray-100"
            )}
          ></Shield>
          <h2 className="text-[16px] font-bold mt-5">Secure Payment</h2>
          <p
            className={cn(
              "text-[14px] font-[200] mt-2",
              theme === "dark" ? "text-gray-400" : "text-gray-700"
            )}
          >
            Your security is our priority. Your payments are secure with us.
          </p>
        </div>
      </div>
    </section>
  );
}
