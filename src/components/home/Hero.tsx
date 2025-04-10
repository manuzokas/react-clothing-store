import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import man from "@/assets/man-hero-section.png";
import { Link } from "react-router-dom";

export default function Hero() {
  const { theme } = useTheme();
  return (
    <section
      className={cn(
        "flex flex-col w-full md:flex-row justify-between items-center h-120 md:h-[440px] px-4 md:px-0",
        theme === "dark" ? "bg-gray-500" : "bg-gray-100"
      )}
    >
      {/* div da esquerda */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full text-center md:text-left">
        <div>
          <h1
            className={cn(
              "text-[24px] md:text-[32px] font-bold",
              theme === "dark" ? "text-white" : "text-black"
            )}
          >
            Fresh Arrivals Online
          </h1>
          <p
            className={cn(
              "text-[12px] md:text-[14px] font-[200]",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}
          >
            Discover Our Newest Collection Today.
          </p>
        </div>
        <div className="flex mt-2 md:mt-4 md:pr-40">
          <Link to="/listing">
            <button
              className={cn(
                "px-5 py-2 rounded-sm font-[400] text-[12px] md:text-[14px]",
                theme === "dark"
                  ? "bg-black hover:bg-gray-800 text-white"
                  : "bg-black hover:bg-gray-700 text-white"
              )}
            >
              View Collection →
            </button>
          </Link>
        </div>
      </div>
      {/* div da direita */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center relative md:mt-0">
        <div
          className={cn(
            "absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] md:left-30 rounded-full",
            theme === "dark" ? "bg-black" : "bg-black/10"
          )}
        ></div>
        <img
          src={man}
          alt="Hero"
          className="w-fit h-90 md:h-full object-cover relative z-10"
        />
      </div>
    </section>
  );
}
