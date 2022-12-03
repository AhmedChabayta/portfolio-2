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
    <motion.h2
      initial={{ color: 'rgb(107,114,128)' }}
      whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
      transition={{ duration: 2 }}
      viewport={{ once: true }}
      className={`${cairo.className} absolute typography typography-2xl font-bold top-24 left-1/2 -translate-x-1/2 uppercase tracking-[20px]`}
    >
      {title}
    </motion.h2>
  );
}
