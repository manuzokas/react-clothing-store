import React, { useState } from "react";
import "@/styles/Filter.css";

interface FilterProps {
  onApplyFilter: (filter: {
    type: "category" | "price";
    value: string;
  }) => void;
  onRemoveFilter: (filter: {
    type: "category" | "price";
    value: string;
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onApplyFilter, onRemoveFilter }) => {
  const [price, setPrice] = useState<number>(50);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setPrice(value);

    onApplyFilter({ type: "price", value: value.toString() });

    const rangeInput = event.target;
    const percent =
      ((value - parseInt(rangeInput.min, 10)) /
        (parseInt(rangeInput.max, 10) - parseInt(rangeInput.min, 10))) *
      100;
    rangeInput.style.setProperty("--range-percent", `${percent}%`);
  };

  const handleCheckboxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
      onRemoveFilter({ type: "category", value: category });
    } else {
      setSelectedCategories((prev) => [...prev, category]);
      onApplyFilter({ type: "category", value: category });
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-sm">
      <h3 className="text-[14px] font-[500] mb-4">Categories</h3>

      {/* Filtros de categoria */}
      {["Perfume", "T-shirt", "Sweatshirt", "Handbag", "Cap", "Compass"].map(
        (category) => (
          <div key={category} className="mb-2 border-b border-gray-200 pb-2">
            <label className="flex items-center text-[14px]">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              <span
                className={`custom-checkbox ${
                  selectedCategories.includes(category) ? "checked" : ""
                }`}
              ></span>
              {category}
            </label>
          </div>
        )
      )}

      {/* Filtro de Preço */}
      <div className="mb-10 mt-7">
        <h3 className="text-[14px] font-[500] mb-2">Price</h3>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={price}
            onChange={handlePriceChange}
            className="range-input w-full h-1 appearance-none bg-transparent focus:outline-none"
          />
          <span
            className="absolute top-9 text-[12px] font-[500] bg-black text-white px-8 py-0.5 rounded-sm"
            style={{
              left: `calc(${price}% + (${50 - price * 0.5}px))`,
              transform: "translateX(-50%)",
            }}
          >
            ${price}
          </span>
          <span
            className="absolute top-5 left-1/2 transform -translate-x-1/2"
            style={{
              left: `calc(${price}% + (${50 - price * 0.5}px))`,
              transform: "translateX(-165%)",
            }}
          >
            ▲
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
