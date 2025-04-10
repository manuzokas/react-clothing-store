import { Link } from 'react-router-dom';

export default function MiniNavbarTop() {
    return (
      <nav className="w-full bg-black h-8 flex items-center justify-center text-white">
        Get 25% OFF on your first order.
        <Link to="/403" className="ml-2">
            Order Now
        </Link>
      </nav>
    );
}

