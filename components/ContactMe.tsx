import { useRef } from 'react';
import { Personal } from '../types/typings';
import ContactInfo from './ContactInfo';
import emailjs from '@emailjs/browser';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Inputs, TextArea } from './Input';
import { Button } from '@mui/material';
interface PersonalProps {
  personal: Personal;
}

export default function ContactMe({ personal }: PersonalProps) {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
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
  return (
    <div className="h-screen relative flex items-center justify-center gap-6 z-50 ">
      <div className="flex flex-col space-y-10 items-center mt-8">
        <h4 className="text-4xl font-semibold text-center relative w-fit mx-auto mt-12">
          Lets{' '}
          <span className="before:absolute before:w-1/2 before:h-1 before:rounded before:bg-red-500 text-blue-500 before:top-[110%] before:-skew-y-3 -skew-y-6 before:shadow-[10px_5px_5px_#000]">
            talk
          </span>
        </h4>
        <div className="space-y-5">
          <ContactInfo
            title="WhatsApp"
            text={personal.phoneNumber}
            Icon={<PhoneIcon className="w-8" />}
          />
          <ContactInfo
            title=""
            text={personal.email}
            Icon={<EnvelopeIcon className="w-8" />}
          />
          <ContactInfo
            title=""
            text={personal.address}
            Icon={<MapPinIcon className="w-8" />}
          />
        </div>
        <form
          className="form-control flex flex-col justify-center gap-4 p-10 rounded"
          ref={form}
          onSubmit={sendEmail}
        >
          <div className="flex flex-col items-center lg:flex-row space-y-4 md:space-y-0 lg:space-x-2">
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
            className="text-white font-black uppercase bg-sky-500 rounded py-5 active:scale-95 transition-all ease-linear"
            type="submit"
          >
            submit
          </Button>
        </form>
      </div>
    </div>
  );
}
