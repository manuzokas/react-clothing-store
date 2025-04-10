import { useState, useEffect, useCallback } from "react";

interface ShippingAddressFormProps {
  userEmail: string;
  userFullName: string;
  onFormValid: (isValid: boolean) => void; // Função para informar se o formulário é válido
}

export default function ShippingAddressForm({
  userEmail,
  userFullName,
  onFormValid,
}: ShippingAddressFormProps) {
  // Estados para os campos do formulário
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  // Função para validar o formulário (memoizada com useCallback)
  const validateForm = useCallback(() => {
    const isFormValid =
      streetAddress.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      zipCode.trim() !== "" &&
      country.trim() !== "";
    onFormValid(isFormValid); // Informa ao componente pai se o formulário é válido
  }, [streetAddress, city, state, zipCode, country, onFormValid]);

  // Efeito para validar o formulário sempre que os campos mudarem
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Função para consultar a API de CEP
  const fetchAddressFromZipCode = async (zipCode: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setStreetAddress(data.logradouro);
        setCity(data.localidade);
        setState(data.uf);
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
    }
  };

  // Efeito para consultar o CEP quando o campo de CEP for preenchido
  useEffect(() => {
    if (zipCode.length === 8) {
      fetchAddressFromZipCode(zipCode);
    }
  }, [zipCode]);

  return (
    <div className="flex-1 px-15">
      <h2 className="text-[20px] font-bold mb-6">Shipping Address</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* ZIP Code */}
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              placeholder="ZIP Code"
              name="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))} // Remove caracteres não numéricos
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
              maxLength={8}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              placeholder="Country"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="State"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>
        </div>

        {/* Street Address */}
        <div>
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Street Address
          </label>
          <input
            type="text"
            id="streetAddress"
            placeholder="Street, number, complement"
            name="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={userEmail}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
              disabled
            />
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              defaultValue={userFullName}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              required
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  );
}
