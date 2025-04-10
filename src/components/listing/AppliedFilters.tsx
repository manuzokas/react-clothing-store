interface AppliedFiltersProps {
  filters: { type: "category" | "price"; value: string }[];
  onRemoveFilter: (filter: {
    type: "category" | "price";
    value: string;
  }) => void;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({
  filters,
  onRemoveFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center bg-white border border-gray-400 rounded-full px-3 py-1 text-sm"
        >
          <span className="text-black font-medium">
            {filter.type === "category"
              ? filter.value
              : `${filter.value}`}
          </span>
          <button
            onClick={() => onRemoveFilter(filter)}
            className="ml-2 text-red-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default AppliedFilters;
