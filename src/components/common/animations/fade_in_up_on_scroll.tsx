// src/components/common/animations/fade_in_up_on_scroll.tsx
import { motion } from "framer-motion";
import { fadeInUpTween } from "@/utils/motion_variants";

interface Props {
  children: React.ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
}

const FadeInUpOnScroll: React.FC<Props> = ({ children, delay = 0, amount = 0.3, className = "" }) => (
  <motion.div
    variants={fadeInUpTween}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount }}
    transition={{ ...fadeInUpTween.transition, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInUpOnScroll;