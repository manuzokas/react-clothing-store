import blacklogo from "@/assets/Logomark.png";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/utils";

const Infos = () => {
    const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center text-center md:text-left justify-center md:items-start gap-3">
      <div className="flex items-center gap-2">
        <img src={blacklogo} alt="Your Icon" className="w-6 h-6" />
        <h1 className="text-[20px] font-[800]">Ecommerce</h1>
      </div>
      <p
        className={cn(
          "text-[14px] font-[400] w-60",
          theme === "dark" ? "text-gray-300" : "text-gray-500"
        )}
      >
        DevCut is a YouTube channel for practical project-based learning.
      </p>
      {/* icones do github, instagram e youtube */}
      <div
        className={cn(
          "flex flex-row gap-4 md:mt-0",
          theme === "dark" ? "text-white" : "text-gray-500"
        )}
      >
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="w-5 h-5" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Infos;
