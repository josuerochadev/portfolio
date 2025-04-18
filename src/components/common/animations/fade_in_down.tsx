import { motion } from "framer-motion";
import { fadeInDownTween } from "@/utils/motion_variants";

interface FadeInDownProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeInDown: React.FC<FadeInDownProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={fadeInDownTween}
    initial="initial"
    animate="animate"
    transition={{ ...fadeInDownTween.transition, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInDown;