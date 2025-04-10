// components/Sidebar/Sidebar.tsx
import { Link } from "react-router-dom";
import { FaCartPlus, FaUserCheck, FaSignOutAlt, FaHeart } from "react-icons/fa";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => void;
}

const Sidebar = ({
  activeSection,
  setActiveSection,
  handleLogout,
}: SidebarProps) => {
  return (
    <div className="md:w-64 border-r text-center md:text-left border-gray-100 p-6">
      <ul className="space-y-2">
        <li>
          <Link
            to="#"
            className={`block p-2 rounded-lg ${
              activeSection === "orders"
                ? "bg-gray-100 text-black text-[14px] font-semibold"
                : "text-gray-700 text-[14px] hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection("orders")}
          >
            <FaCartPlus className="inline-block mr-2" />
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className={`block p-2 rounded ${
              activeSection === "account"
                ? "bg-gray-100 text-black text-[14px] font-semibold"
                : "text-gray-700 text-[14px] hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection("account")}
          >
            <FaUserCheck className="inline-block mr-2" />
            Account Details
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className={`block p-2 rounded ${
              activeSection === "wishlist"
                ? "bg-gray-100 text-black text-[14px] font-semibold"
                : "text-gray-700 text-[14px] hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection("wishlist")}
          >
            <FaHeart className="inline-block mr-2" />
            Wishlist
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full md:text-left text-[14px] p-2 rounded text-gray-700 hover:bg-gray-200"
          >
            <FaSignOutAlt className="inline-block mr-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
