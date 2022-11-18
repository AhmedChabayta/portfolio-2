import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatingNumber({ value }: { value: number }) {
  const numberRef = useRef<HTMLParagraphElement>(null);
  const from = 0;
  const to = value;
  useEffect(() => {
    const number = numberRef.current;
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        if (number != null) {
          number.textContent = value.toFixed(2);
        }
      },
    });
    return () => controls.stop();
  }, [to, numberRef]);
  return (
    <p
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-2xl invisible"
      ref={numberRef}
    />
  );
}
