import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

const AllRightsReserverd = () => {
  const { theme } = useTheme();
    return (
      <div className={cn("flex text-center justify-center items-center", theme === "dark" ? "bg-black text-white" : "bg-white")}>
        <p className={cn("text-[14px] font-[400] text-gray-500 text-center w-full border-t py-4", theme === "dark" ? "border-gray-700" : "border-gray-200")}>
          © 2025 Dev. All rights reserved.
        </p>
      </div>
    );
}

export default AllRightsReserverd;