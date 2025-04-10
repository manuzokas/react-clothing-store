import manu from "@/assets/manu.jpeg";
import bmc from "@/assets/bmc-button.png";
import header from "@/assets/eCompass.png";
import { ParticleEffect } from "@/components/effects/ParticleEffect";
import { FaEnvelope, FaGlobe, FaUserCog } from "react-icons/fa";
import { useEffect } from "react";

const AboutPage = () => {

  useEffect(() => {
      document.title = "About Me | eCompass";
    }, []);

  return (
    <section className="flex flex-col items-center bg-white min-h-screen relative">
      {/* Efeito de partículas */}
      <ParticleEffect />

      {/* Container principal */}
      <div
        className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden z-10 mt-5"
        style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 1)" }}
      >
        {/* Header com imagem de fundo */}
        <div
          className="flex flex-col items-center justify-center w-full h-64 relative bg-cover bg-center"
          style={{
            backgroundImage: `url(${header})`,
          }}
        >
          {/* Foto do usuário no lado direito */}
          <a
            href="/"
            className="absolute bottom-53 left-1 text-white hover:text-gray-300 text-3xl bg-opacity-50 px-3 py-1 rounded hover:bg-opacity-75 transition-opacity"
          >
            ←
          </a>
          <img
            src={manu}
            alt="User"
            className="w-40 h-40 absolute -bottom-20 right-20 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Conteúdo abaixo da header */}
        <div className="flex flex-col gap-6 p-8">
          {/* Título e descrição */}
          <h1 className="text-4xl font-bold text-gray-900">Ecompass</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Hey there 👋 I'm Manuella!
            <br />
            Software developer since 2020, passionate about crafting user
            experiences and transforming ideas into polished products.
          </p>

          {/* Informações de contato */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-black text-xl" />
              <p className="text-gray-700">
                <span className="font-semibold">For inquiries:</span>{" "}
                <a
                  href="mailto:manuella.rodrigues.dev@gmail.com"
                  className="underline hover:text-purple-600 transition-colors"
                >
                  manuella.rodrigues.dev@gmail.com
                </a>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaGlobe className="text-black text-xl" />
              <p className="text-gray-700">
                <span className="font-semibold">Live Website:</span>{" "}
                <a
                  href="https://ecommerce.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-purple-600 transition-colors"
                >
                  ecommerce.com
                </a>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaUserCog className="text-black text-xl" />
              <p className="text-gray-700">
                <span className="font-semibold">Live Admin:</span>{" "}
                <a
                  href="https://ecommerce-admin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-purple-600 transition-colors"
                >
                  ecommerce-admin.com
                </a>
              </p>
            </div>
          </div>

          {/* Botão "Buy Me a Coffee" */}
          <div className="mt-6">
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={bmc}
                alt="Buy Me a Coffee"
                className="w-48 h-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
