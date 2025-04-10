import Hero from "@/components/home/Hero";
import SecondSection from "@/components/home/SecondSection";
import ThirdSection from "@/components/home/ThirdSection";
import FourthSection from "@/components/home/FourthSection";
import FifthSection from "@/components/home/FifthSection";
import CouponCard from "@/components/cupom/CouponCard";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home | eCompass";
  }, []);

  return (
    <div className="mt-26">
      <CouponCard />
      <Hero />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
    </div>
  );
}
