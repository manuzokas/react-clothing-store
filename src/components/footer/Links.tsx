import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/utils";
import { Link } from "react-router-dom";

const Links = () => {
    const { theme } = useTheme();
    return (
      <div className="flex flex-row gap-15 pt-10 md:pt-0 md:gap-25 items-center justiy-center">
        {/* div dos links do Support do footer vertical */}
        <div
          className={cn(
            "flex flex-col gap-2 md:gap-4",
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          )}
        >
          <h1
            className={cn(
              "text-[16px] font-[400]",
              theme === "dark" ? "text-white" : "text-gray-400"
            )}
          >
            Support
          </h1>
          <Link to="/404" className="text-[14px] font-[400]">
            FAQ
          </Link>
          <Link to="/404" className="text-[14px] font-[400]">
            Terms of use
          </Link>
          <Link to="/404" className="text-[14px] font-[400]">
            Privacy Policy
          </Link>
        </div>
        {/* div dos links do Company do footer vertical */}
        <div className="flex flex-col gap-2 md:gap-4">
          <h1
            className={cn(
              "text-[16px] font-[400]",
              theme === "dark" ? "text-white" : "text-gray-400"
            )}
          >
            Company
          </h1>
          <Link to="/about" className="text-[14px] font-[400]">
            About Us
          </Link>
          <Link to="/404" className="text-[14px] font-[400]">
            Contact
          </Link>
          <Link to="/404" className="text-[14px] font-[400]">
            Careers
          </Link>
        </div>
        {/* div dos links do Shop do footer vertical */}
        <div className="flex flex-col gap-2 md:gap-4">
          <h1
            className={cn(
              "text-[16px] font-[400]",
              theme === "dark" ? "text-white" : "text-gray-400"
            )}
          >
            Shop
          </h1>
          <Link to="/profile" className="text-[14px] font-[400]">
            My Account
          </Link>
          <Link to="/checkout" className="text-[14px] font-[400]">
            Checkout
          </Link>
          <Link to="/sign-in" className="text-[14px] font-[400]">
            Cart
          </Link>
        </div>
      </div>
    );
}

export default Links;