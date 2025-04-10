// src/components/forms/FormInput.tsx
import { FiAlertCircle } from "react-icons/fi";
import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  className = "",
}: FormInputProps<T>) {
  return (
    <div className={className}>
      {" "}
      <label className="block text-sm font-medium text-black mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full bg-white px-4 py-3 rounded-lg border ${
            error ? "border-blue-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiAlertCircle className="h-5 w-5 text-blue-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-blue-600 flex items-center gap-1">
          <FiAlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
}
