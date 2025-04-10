import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/schemas/authSchema";
import { FormInput } from "@/components/forms/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp, useAuth, useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export function RegisterForm() {
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { signOut } = useAuth();
  const { signIn, isLoaded } = useSignIn(); 
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setError("");

      if (!signUp) {
        throw new Error(
          "Erro ao acessar o serviço de registro. Tente novamente."
        );
      }

      // criando usuário no Clerk
      const signUpResponse = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName, // criando o firstName
        lastName: data.lastName, // criando o lastName
      });

      if (!signUpResponse.createdUserId) {
        throw new Error("Erro ao criar usuário no Clerk.");
      }

      // deslogando o usuário após o cadastro
      await signOut();

      reset();

      // redireciona para login após sucesso
      navigate("/sign-in?register=success");
      window.location.reload();
    } catch (error) {
      let errorMessage = "Erro ao registrar usuário. Tente novamente.";
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      setError(errorMessage);
    }
  };

  // Função para autenticar com o Google
  const handleGoogleSignIn = () => {
    if (!isLoaded || !signIn) {
      setError("Erro ao carregar autenticação. Tente novamente.");
      return;
    }

    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/oauth-callback",
      redirectUrlComplete: "/", 
    });
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[320px] max-w-md rounded-md bg-white"
      >
        {/* Botão "Continue with Google" */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 justify-center w-full h-[44px] bg-white border border-gray-300 rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Divisor "or" */}
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500 px-4">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Campos de registro */}
        <div className="flex flex-col gap-4">
          {/* Campo para firstName */}
          <FormInput<RegisterSchema>
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter Your First Name"
            register={register}
            error={errors.firstName}
          />

          {/* Campo para lastName */}
          <FormInput<RegisterSchema>
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter Your Last Name"
            register={register}
            error={errors.lastName}
          />

          <FormInput<RegisterSchema>
            label="E-mail"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            register={register}
            error={errors.email}
          />
          <FormInput<RegisterSchema>
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            error={errors.password}
          />
        </div>

        <p className="text-sm text-gray-600 text-left">
          By creating an account you agree with our Terms of Service, Privacy
          Policy,
        </p>

        {/* Botão de registro */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-black text-white font-semibold py-3 rounded-sm transition-all duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Registering...
            </div>
          ) : (
            "Create account"
          )}
        </button>

        {/* Display error message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Link para login */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-gray-600 hover:text-blue-700 font-medium"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
