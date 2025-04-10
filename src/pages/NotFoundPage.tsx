import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const NotFound = () => {
    useEffect(() => {
        document.title = "404 | eCompass";
      }, []);
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn2.hubspot.net/hubfs/317022/3d%20fashion%20runway.jpeg')",
        }}
      ></div>
      {/* Runway Lights Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-gray-200 opacity-20"></div>
      <div className="absolute inset-0 flex justify-center">
        <motion.div
          className="w-1 h-full bg-white opacity-20"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center bg-black/50 shadow-lg shadow-red-500 p-10 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-8xl font-extrabold text-white">404</h1>
        <p className="text-2xl mt-4 font-semibold">
          Oops! You’re off the runway.
        </p>
        <p className="text-gray-400 mt-2">
          This page doesn’t exist, but your next best outfit does!
        </p>
        <motion.div whileHover={{ scale: 1.1 }} className="mt-6">
          <Link
            to="/"
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-md transition"
          >
            🚶‍♀️ Back to Fashion
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
