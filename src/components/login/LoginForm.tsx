import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/authSchema";
import { FormInput } from "@/components/forms/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa"; 

export function LoginForm() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    if (!isLoaded || !signIn) {
      setError("Erro ao carregar autenticação. Tente novamente.");
      return;
    }

    try {
      const signInResponse = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInResponse.createdSessionId) {
        await setActive({ session: signInResponse.createdSessionId });

        setLoginSuccess(true);

        setTimeout(() => {
          navigate("/");
          window.location.reload(); 
        }, 2000);
      } else {
        throw new Error("Erro ao iniciar sessão.");
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

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
    <div className="h-auto py-20 bg-white flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[320px] max-w-md rounded-md bg-white"
      >
        {/* button de "Continue with Google" */}
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

        {/* divisor "or" */}
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500 px-4">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* campos de e-mail e senha */}
        <div className="flex flex-col gap-4">
          <FormInput<LoginSchema>
            label="E-mail"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            register={register}
            error={errors.email}
          />
          <FormInput<LoginSchema>
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            error={errors.password}
          />
        </div>

        {/* link pro "Forgot your password?" */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-800 hover:text-blue-700 font-medium"
          >
            Forgot your password?
          </Link>
        </div>

        {/* botao de login */}
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
              Logging in...
            </div>
          ) : (
            "Log In"
          )}
        </button>

        {/* error message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Mensagem de sucesso */}
        {loginSuccess && (
          <div className="flex items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-md">
            <FaCheckCircle className="w-5 h-5" />
            <span>You have successfully logged in</span>
          </div>
        )}

        {/* link para registro */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-gray-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
