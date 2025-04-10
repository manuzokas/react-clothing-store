import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import afterPay from "@/assets/afterpayment.png"
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SucessfulOrder = () => {
    const breadcrumbItems = [
      { label: "Ecommerce", href: "/" },
      { label: "Successful Order" },
    ];
      useEffect(() => {
          document.title = "Sucessfull Order | eCompass";
        }, []);

  return (
    <section className="flex flex-col items-center justify-center w-full h-full bg-white mt-26">
      <div className="flex flex-col items-start justify-start w-full py-10 px-30 bg-green-100">
        <h1 className="text-[24px] font-bold">Successful Order</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 bg-white h-full py-30">
        <img className="" src={afterPay} alt="afterPayImg" />
        <h1 className="text-[24px] font-bold">Thank You for Shopping</h1>
        <p className="text-[16px] text-center w-100">
          Your order has been successfully placed and is now being processed.
        </p>
        <Link to="/profile" className="bg-black text-white text-[12px] rounded px-5 py-2 flex items-center">
          Go To My Account
          <span className="ml-2 text-[15px]">→</span>
        </Link>
      </div>
    </section>
  );
};

export default SucessfulOrder;
