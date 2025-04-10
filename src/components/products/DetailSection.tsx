import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function DetailSection() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<"details" | "reviews">(
    "details"
  );

  return (
    <section
      className={cn(
        "flex flex-col md:flex-row items-center md:px-45 h-full md:h-70 md:gap-10",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="flex flex-col gap-2">
        {/* detalhes */}
        <div
          onClick={() => setActiveSection("details")}
          className={cn(
            "flex items-center justify-start text-left w-70 gap-2 h-10 rounded-md cursor-pointer transition-colors",
            activeSection === "details"
              ? "bg-gray-300 text-white"
              : theme === "dark"
              ? "bg-gray-600"
              : "bg-gray-100"
          )}
        >
          <div className="flex items-center gap-4 px-6">
            <p className="text-left">⋯</p>
            <p className="font-[500] text-left">Details</p>
          </div>
        </div>

        {/* reviews */}
        <div
          onClick={() => setActiveSection("reviews")}
          className={cn(
            "flex items-center justify-start text-left w-70 gap-2 h-10 rounded-md cursor-pointer transition-colors",
            activeSection === "reviews"
              ? "bg-gray-300 text-white"
              : theme === "dark"
              ? "bg-gray-600"
              : "bg-gray-100"
          )}
        >
          <div className="flex items-center gap-4 px-6">
            <p className="text-left">⋯</p>
            <p className="font-[500] text-left">Reviews</p>
          </div>
        </div>
      </div>

      {/* conteudo da secao ativa */}
      <div className="flex flex-col items-center md:items-start gap-2 pt-5 md:pt-0">
        {activeSection === "details" ? (
          <>
            <h1 className="text-center md:text-left font-bold">Detail</h1>
            <p className="text-center text-sm md:text-md w-100 md:text-left md:w-190">
              Elevate your everyday style with our Men's Black T-Shirts, the
              ultimate wardrobe essential for modern men. Crafted with
              meticulous attention to detail and designed for comfort, these
              versatile black tees are a must-have addition to your collection.
            </p>
          </>
        ) : (
          <div className="flex flex-row items-center md:items-start gap-3">
            <div>
              {/* div da imagem */}
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                className="w-7 h-7 rounded-full"
              />
            </div>
            {/* div dos dados do usuario */}
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-[14px]">Customer</h1>
              <p className="font-[400] text-[13px] text-gray-700">1 WEEK AGO</p>
              <p className="text-gray-700 font-[400] text-[15px]">
                This company always goes above and beyond to satisfy their
                customers.
              </p>
            </div>
            {/* estrelas de review */}
            <div className="flex flex-row gap-1">
              <FaStar className="text-black" />
              <FaStar className="text-black" />
              <FaStar className="text-black" />
              <FaStar className="text-black" />
              <FaStar className="text-black" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
