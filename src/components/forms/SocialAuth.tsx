// src/components/forms/SocialAuth.tsx
import { FaGoogle, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

export function SocialAuth() {
  return (
    <div className="flex justify-center gap-4">
      <button className="p-3 bg-white border border-orange-200 rounded-full shadow-md hover:bg-black transition-all">
        <FaGoogle className="text-blue-500 w-6 h-6" />
      </button>
      <button className="p-3 bg-white border border-blue-200 rounded-full shadow-md hover:bg-black transition-all">
        <FaFacebook className="text-blue-600 w-6 h-6" />
      </button>
      <button className="p-3 bg-white border border-blue-200 rounded-full shadow-md hover:bg-black transition-all">
        <FaGithub className="text-blue-600 w-6 h-6" />
      </button>
      <button className="p-3 bg-white border border-blue-400 rounded-full shadow-md hover:bg-black transition-all">
        <FaTwitter className="text-blue-400 w-6 h-6" />
      </button>
    </div>
  );
}
