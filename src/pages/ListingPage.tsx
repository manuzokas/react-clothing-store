import React, { useState } from "react";
import Filter from "@/components/listing/Filter";
import ProductList from "@/components/listing/ProductList";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import SearchInput from "@/components/listing/SearchInput";
import AppliedFilters from "@/components/listing/AppliedFilters";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import useFetch from "@/hooks/useFetch";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Product } from "@/types/product";
import { useEffect } from "react";

type Filter = {
  type: "category" | "price";
  value: string;
};

const ITEMS_PER_PAGE = 9;

const ListingPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
      document.title = "Catalog | eCompass";
    }, []);

  // Buscar produtos
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>("http://localhost:3001/products");

  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "Search" },
  ];

  const addFilter = (filter: Filter) => {
    if (filter.type === "price") {
      // Remove qualquer filtro de preço existente e adiciona o novo
      setAppliedFilters([
        ...appliedFilters.filter((f) => f.type !== "price"),
        filter,
      ]);
    } else if (
      !appliedFilters.some(
        (f) => f.type === filter.type && f.value === filter.value
      )
    ) {
      setAppliedFilters([...appliedFilters, filter]);
    }
  };

  const removeFilter = (filter: {
    type: "category" | "price";
    value: string;
  }) => {
    setAppliedFilters(
      appliedFilters.filter(
        (f) => f.type !== filter.type || f.value !== filter.value
      )
    );
  };

  // Filtrando produtos
  const filteredProducts = products
    ? products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesFilters = appliedFilters.every((filter) => {
          if (filter.type === "category") {
            return product.category === filter.value;
          } else if (filter.type === "price") {
            const priceValue = parseFloat(filter.value);
            return product.price <= priceValue;
          }
          return true;
        });

        return matchesSearch && matchesFilters;
      })
    : [];

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="p-10 text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">Erro: {error}</div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen mt-26",
        theme === "dark" ? "bg-gray-300 text-black" : "bg-white text-black"
      )}
    >
      {/* Breadcrumb */}
      <div
        className={cn(
          "flex items-center justify-start w-full py-5 px-15 md:px-30",
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        )}
      >
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex flex-col md:flex-row px-10 md:px-60 py-10">
        {/* Filtro */}
        <div className="w-full md:w-[248px] pr-0 md:pr-5 mb-6 md:mb-0">
          <Filter onApplyFilter={addFilter} onRemoveFilter={removeFilter} />
        </div>

        {/* Lista de produtos */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Applied Filters</h3>
            <AppliedFilters
              filters={appliedFilters}
              onRemoveFilter={removeFilter}
            />
          </div>

          {/* Informações e busca */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <span
              className={cn(
                "text-[12px] mb-4 md:mb-0",
                theme === "dark" ? "text-gray-600" : "text-gray-600"
              )}
            >
              Showing {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}{" "}
              of {filteredProducts.length} results
            </span>
            <div className="w-full md:w-64">
              <SearchInput
                placeholder="Search products..."
                onChange={setSearchQuery}
              />
            </div>
          </div>

          {/* Lista de produtos paginados */}
          <ProductList products={paginatedProducts} />

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                  "px-3 py-2 mx-1 rounded",
                  theme === "dark"
                    ? currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-white hover:bg-gray-600"
                    : currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-black hover:bg-gray-300"
                )}
              >
                <FaArrowLeft />
              </button>

              <span
                className={cn(
                  "px-4 py-2 mx-2 border rounded",
                  theme === "dark"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-200 text-black"
                )}
              >
                {currentPage}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                  "px-3 py-2 mx-1 rounded",
                  theme === "dark"
                    ? currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-white hover:bg-gray-600"
                    : currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-black hover:bg-gray-300"
                )}
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
