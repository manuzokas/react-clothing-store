import { FaSearch } from 'react-icons/fa';
import { cn } from '@/utils/utils';
import { useTheme } from '@/hooks/useTheme';


interface SearchInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onChange }) => {
  const { theme } = useTheme();
  return (
    <div className="relative flex items-center">
      <FaSearch className="absolute left-2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder || "Search products"}
        onChange={(e) => onChange(e.target.value)}
        className={cn("w-full px-8 py-2 text-sm border border-gray-300 rounded-sn focus:outline-none focus:ring-2 focus:ring-black", theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900")}
      />
    </div>
  );
};

export default SearchInput;
