import { motion } from 'framer-motion';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <motion.h3
      initial={{ color: 'rgb(107,114,128)' }}
      whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
      transition={{ duration: 2 }}
      viewport={{ once: true }}
      className="absolute font-cairo top-24 left-1/2 -translate-x-1/2 uppercase tracking-[20px] font-bold text-3xl xl:text-4xl "
    >
      {title}
    </motion.h3>
  );
}
