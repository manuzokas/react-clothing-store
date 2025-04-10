import NewsletterForm from "@/components/forms/NewsletterForm";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/utils";

const NewsLetter = () => {
    const { theme } = useTheme();
    return (
      <section
        className={cn(
          "flex flex-col md:flex-row justify-between items-center md:px-50 md:pt-10 pt-5",
          theme === "dark" ? "bg-black text-white" : "bg-gray-100"
        )}
      >
        <div className="flex flex-col items-center pb-5 md:pb-10 md:items-start justify-center gap-2">
          <h1 className="text-[24px] font-[700]">Join Our Newsletter</h1>
          <p
            className={cn(
              "text-[14px] font-[400]",
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            )}
          >
            We love to surprise our subscribers with occasional gifts.
          </p>
        </div>
        <NewsletterForm />
      </section>
    );
}

export default NewsLetter;