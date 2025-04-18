import { motion } from "framer-motion";
import { fadeInUpTween } from "@/utils/motion_variants";

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeInUp: React.FC<FadeInUpProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={fadeInUpTween}
    initial="initial"
    animate="animate"
    transition={{ ...fadeInUpTween.transition, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInUp;