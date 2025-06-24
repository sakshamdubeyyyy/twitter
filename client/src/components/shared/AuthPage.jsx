import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export default function AuthPage({ children }) {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const background = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX}px ${latestY}px, #38BDF8, #E0F2FE)`
  );

  const staticBackground = `radial-gradient(circle at center, #38BDF8, #E0F2FE)`;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center transition-colors duration-300 relative px-4"
      style={{
        background: hovering ? background : staticBackground,
        transition: "background 0.3s ease",
      }}
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
    </motion.div>
  );
}
