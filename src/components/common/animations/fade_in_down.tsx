import { motion } from "framer-motion";
import { fadeInDownSpring } from "@/utils/motion_variants";

interface FadeInDownProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeInDown: React.FC<FadeInDownProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={fadeInDownSpring}
    initial="initial"
    animate="animate"
    transition={{ ...fadeInDownSpring.transition, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInDown;