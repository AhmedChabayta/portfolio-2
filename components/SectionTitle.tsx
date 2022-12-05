import { motion } from 'framer-motion';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="h-20 xs:h-0">
      <motion.h2
        initial={{ color: 'rgb(107,114,128)' }}
        whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className={`absolute left-1/2 top-20 -translate-x-1/2 text-2xl font-bold uppercase tracking-[10px] xs:top-14 xs:hidden sm:text-3xl md:top-20 md:text-4xl lg:top-10`}
      >
        {title}
      </motion.h2>
    </div>
  );
}
