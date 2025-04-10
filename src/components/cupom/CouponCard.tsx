import { useState, useEffect } from "react";

const CouponCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenCoupon = localStorage.getItem("hasSeenCoupon");
    if (!hasSeenCoupon) {
      setIsVisible(true);
      localStorage.setItem("hasSeenCoupon", "true");
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 Welcome!</h2>
        <p className="text-gray-600 mb-4">
          You have received a <strong>10% OFF</strong> coupon on your first purchase!
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <span className="text-xl font-bold text-gray-800">COUPON10</span>
        </div>
        <button
          onClick={handleClose}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CouponCard;
