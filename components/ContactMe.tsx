import { useRef, useState } from 'react';
import ContactInfo from './ContactInfo';
import emailjs from '@emailjs/browser';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Inputs, TextArea } from './Input';
import { Button, SnackbarCloseReason } from '@mui/material';
import { motion } from 'framer-motion';
import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';
import SectionTitle from './SectionTitle';

export default function ContactMe({
  phoneNumber,
  email,
  address,
}: {
  phoneNumber: string;
  email: string;
  address: string;
}) {
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
    <div className="relative z-50 flex min-h-screen flex-col items-center justify-evenly md:justify-center">
      <SectionTitle title="contact" />
      <SnackbarUnstyled
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        className="fixed top-0 left-0 right-0 flex w-full justify-center border-b border-white bg-sky-500/60 backdrop-blur-3xl"
      >
        <motion.p initial={{ opacity: 0.1 }} whileInView={{ opacity: 1 }}>
          Copied!
        </motion.p>
      </SnackbarUnstyled>

      <div className="my-10 flex flex-col space-y-4">
        <ContactInfo
          setShowSnackbar={setShowSnackbar}
          title="WhatsApp"
          text={phoneNumber}
          Icon={<PhoneIcon className="w-8" />}
        />
        <ContactInfo
          setShowSnackbar={setShowSnackbar}
          title=""
          text={email}
          Icon={<EnvelopeIcon className="w-8" />}
        />
        <ContactInfo
          title=""
          text={address}
          Icon={<MapPinIcon className="w-8" />}
        />
      </div>
      <form
        className="form-control flex flex-col justify-center rounded"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="flex flex-col items-center lg:flex-row lg:space-x-2">
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
          className="mx-auto my-5 h-10 w-1/2 rounded font-black uppercase transition-all ease-linear active:scale-95 xs:my-2 sm:my-4 md:my-8"
          type="submit"
        >
          submit
        </Button>
      </form>
    </div>
  );
}
