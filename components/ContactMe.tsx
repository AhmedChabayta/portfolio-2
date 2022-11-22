import { motion } from 'framer-motion';

export default function ContactMe() {
  return (
    <div className="h-screen relative flex items-center justify-center gap-6 z-50 ">
      <motion.h3
        initial={{ color: 'rgb(107,114,128)' }}
        whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="absolute top-24 uppercase tracking-[20px] text-2xl"
      >
        contact
      </motion.h3>
      <div className="flex flex-col items-center justify-center rounded py-10 space-y-4">
        <div className="flex items-center w-[500px]">
          <input placeholder="name" className="contact-inputs" type="text" />
          <input placeholder="e-mail" className="contact-inputs" type="email" />
        </div>
        <input
          placeholder="subject"
          className="contact-inputs w-[90%]"
          type="email"
        />
        <textarea
          placeholder="message"
          className="contact-inputs w-[90%] h-[200px]"
        />
      </div>
    </div>
  );
}
