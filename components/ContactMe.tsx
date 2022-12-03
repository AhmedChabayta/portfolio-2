import { useRef, useState } from 'react';
import { Personal } from '../types/typings';
import ContactInfo from './ContactInfo';
import emailjs from '@emailjs/browser';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Inputs, TextArea } from './Input';
import { Button, SnackbarCloseReason } from '@mui/material';
import { motion } from 'framer-motion';
import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';
import SectionTitle from './SectionTitle';

interface PersonalProps {
  personal: Personal;
}

export default function ContactMe({ personal }: PersonalProps) {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          `${process.env.NEXT_PUBLIC_SERVICE}`,
          `${process.env.NEXT_PUBLIC_TEMPLATE}`,
          form.current,
          `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`
        )
        .then(
          (result) => {
            if (result.text === 'OK') {
              console.log(result.text);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };
  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <div className="h-screen relative flex flex-col items-center justify-center z-50 pt-20">
      <SectionTitle title="contact" />
      <SnackbarUnstyled
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        className="flex justify-center fixed top-0 left-0 right-0 w-full bg-sky-500/60 border-b border-white backdrop-blur-3xl"
      >
        <motion.p initial={{ opacity: 0.1 }} whileInView={{ opacity: 1 }}>
          Copied!
        </motion.p>
      </SnackbarUnstyled>

      <article className=" space-y-5">
        <ContactInfo
          setShowSnackbar={setShowSnackbar}
          title="WhatsApp"
          text={personal.phoneNumber}
          Icon={<PhoneIcon className="w-8" />}
        />
        <ContactInfo
          setShowSnackbar={setShowSnackbar}
          title=""
          text={personal.email}
          Icon={<EnvelopeIcon className="w-8" />}
        />
        <ContactInfo
          title=""
          text={personal.address}
          Icon={<MapPinIcon className="w-8" />}
        />
      </article>
      <form
        className="form-control flex flex-col justify-center gap-4 p-10 rounded space-y-8"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="flex flex-col items-center lg:flex-row space-y-8 lg:space-y-0 lg:space-x-2">
          <Inputs
            label="user name"
            placeholder="user name"
            name="from_name"
            type="text"
          />
          <Inputs
            label="user email"
            placeholder="user email"
            name="from_email"
            type="text"
          />
        </div>

        <TextArea placeholder="message" name="message" label="message" />
        <Button
          variant="contained"
          className="font-black uppercase bg-sky-500 rounded py-5 active:scale-95 transition-all ease-linear"
          type="submit"
        >
          submit
        </Button>
      </form>
    </div>
  );
}
