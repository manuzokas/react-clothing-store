// components/ParticleEffect.tsx
import { motion } from "framer-motion";
import camiseta from "@/assets/camiseta.png";
import calca from "@/assets/calca.png";
import sapatos from "@/assets/sapatos-de-inverno.png";
import cachecol from "@/assets/silencioso.png";
import meias from "@/assets/meias-de-inverno.png";

export function ParticleEffect() {
  const fashionSymbols = [camiseta, calca, sapatos, cachecol, meias];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => {
        const symbol =
          fashionSymbols[Math.floor(Math.random() * fashionSymbols.length)];

        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: `${Math.random() * 100}%`,
              filter: "drop-shadow(0 0 8px rgba(255, 192, 203, 0.8))",
            }}
            initial={{
              y: Math.random() * -window.innerHeight,
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: window.innerHeight + 100, 
              opacity: [0, 1, 0], 
              rotate: Math.random() * 360, 
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          >
            {/* Renderiza a imagem */}
            <img
              src={symbol}
              alt="Fashion item"
              className="w-12 h-12 object-contain"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
