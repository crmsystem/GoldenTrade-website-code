import { useRef } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import zohoShowcase from "@/assets/zoho-partner-showcase.png";

type ZohoPartnerShowcaseProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export function ZohoPartnerShowcase({
  src = zohoShowcase,
  alt = "Goldentrade Solutions — 8+ Years Zoho Partner, System Admin & Developer dashboard showcase with CRM, Books, Inventory and Zoho One app icons",
  width = 1448,
  height = 1086,
}: ZohoPartnerShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-xl mx-auto"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,32,91,0.25)] hover:shadow-[0_40px_90px_-12px_rgba(0,32,91,0.4)] transition-shadow duration-500 bg-white"
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: `${width} / ${height}` }}
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Subtle independent-speed glow zones for depth, echoing the badge and integration-card areas of the image */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute -top-3 -left-3 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-300/30 to-transparent blur-xl pointer-events-none"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute bottom-6 right-4 w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue/20 to-transparent blur-xl pointer-events-none"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          className="absolute top-1/3 right-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-sky/30 to-transparent blur-xl pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
