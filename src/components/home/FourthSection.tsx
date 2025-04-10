import { cn } from "@/utils/utils"
import { useTheme } from "@/hooks/useTheme"
import womanClothe from "@/assets/white-woman-clothes.png"
import { Link } from "react-router-dom"

export default function FourthSection() {
    const { theme } = useTheme()

    return (
      <section
        className={cn(
          "flex flex-col w-full md:flex-row justify-center text-center md:text-left items-center h-full pt-20 md:pt-0 md:h-[304px]",
          theme === "dark" ? "bg-black" : "bg-white"
        )}
      >
        <div className="flex flex-col  justify-center items-center w-1/2 h-full">
          <div className="flex flex-col gap-2 md:gap-2">
            <h1
              className={cn(
                "text-[24px] font-[700]",
                theme === "dark" ? "text-white" : "text-black"
              )}
            >
              Browse Our Fashion Paradise!
            </h1>
            <p
              className={cn(
                "text-[14px] font-[400] w-[390px]",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}
            >
              Step into a world of style and explore our diverse collection of
              clothing categories.
            </p>
          </div>
          <div className="flex pt-4 pb-15 md:pb-0 md:pr-62">
            <Link
              to="/listing"
              className={cn(
              "px-5 py-2 md:px-5 md:py-2 rounded-sm font-[500] text-[13px]",
              theme === "dark"
                ? "bg-white/80 text-black"
                : "bg-black hover:bg-gray-700 text-white"
              )}
            >
              Start Browsing →
            </Link>
          </div>
        </div>

        {/* div do lado direito da tela com uma imagem */}
        <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
          <img
            src={womanClothe}
            alt="Section 4"
            className="h-full object-cover"
          />
        </div>
      </section>
    );
}