import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/utils";
import NewsLetter from "@/components/footer/NewsLetter";
import Links from "@/components/footer/Links";
import Infos from "@/components/footer/Infos";
import AcceptedPayments from "@/components/footer/AcceptedPayments";
import AllRightsReserverd from "@/components/footer/AllRightsReserverd";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={cn("flex flex-col",
        theme === "dark"
          ? "bg-black border-t border-blue-600 text-blue-200"
          : "bg-gray-100 text-black"
      )}
    >
      <NewsLetter />

      {/* div em baixo com os links do footer */}
      <div
        className={cn(
          "flex flex-col md:flex-row justify-center md:justify-between items-center md:px-50 py-10",
          theme === "dark" ? "bg-black text-white" : "bg-white"
        )}
      >
        {/* div da esquerda (logo, paragrafo e icones das redes) */}
        <Infos />

        {/* div do meio */}
        <Links />

        {/* div da direita ACCEPTED PAYMENTS com icones de mastercard, amex e visa */}
        <AcceptedPayments />

      </div>
      {/* div do All rights reserved com border top */}
      <AllRightsReserverd />
    </footer>
  );
}
