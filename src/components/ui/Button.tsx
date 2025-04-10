import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

const Button = ({ className, variant = "primary", ...props }: ButtonProps) => {
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700", // Estilo primário (ex: "Comprar")
    secondary: "bg-blue-600 text-blue-100 hover:bg-blue-800", // Estilo secundário (ex: "Voltar")
    outline: "border border-gray-600 text-gray-600 hover:bg-gray-100", // Estilo outline (ex: "Ver Detalhes")
  };

  return (
    <button
      className={`px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

export { Button };
