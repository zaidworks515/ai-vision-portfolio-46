import { motion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fades content up once as it enters the viewport. MotionConfig handles reduced motion. */
export function Reveal({ delay = 0, y = 18, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { EASE };
