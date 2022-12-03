import { motion } from 'framer-motion';
import { Cairo_Play as CP } from '@next/font/google';

const cairo = CP({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'auto',
  variable: '--font-cairo',
  fallback: ['system-ui', 'arial'],
});
export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="h-20 md:h-0">
      <motion.h2
        initial={{ color: 'rgb(107,114,128)' }}
        whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className={`${cairo.className} absolute left-1/2 top-16 -translate-x-1/2 text-xl font-bold uppercase tracking-[10px] `}
      >
        {title}
      </motion.h2>
    </div>
  );
}
