import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticFramer({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mousePosition = {
    x: useSpring(0),
    y: useSpring(0),
  };
  const { x, y } = mousePosition;
  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + (width >> 1));
    const middleY = clientY - (top + (height >> 1));
    mousePosition.x.set(middleX);
    mousePosition.y.set(middleY);
  };

  return (
    <motion.div
      style={{ position: "relative", x, y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        mousePosition.x.set(0);
        mousePosition.y.set(0);
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
