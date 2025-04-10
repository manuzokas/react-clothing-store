import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ForbiddenPage = () => {

  useEffect(() => {
      document.title = "Forbidden | eCompass";
    }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.creativefabrica.com/wp-content/uploads/2018/11/Fashion-Background-by-nirmala.graphics-580x386.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <motion.div
        className="text-center bg-black/50 shadow-lg shadow-red-500 p-10 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-8xl font-extrabold text-white">403</h1>
        <p className="text-2xl mt-4 font-semibold">Access Denied! 🚫</p>
        <p className="text-gray-400 mt-2">
          You don’t have permission to access this page. But don’t worry,
          there’s plenty more to explore!
        </p>
        <motion.div whileHover={{ scale: 1.1 }} className="mt-6">
          <Link
            to="/"
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-md transition"
          >
            🏠 Back to Shop
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated Lock Icon */}
      <motion.div
        className="absolute bottom-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-white opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
