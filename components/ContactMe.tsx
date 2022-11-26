import { useRef } from 'react';
import { Personal } from '../types/typings';
import ContactInfo from './ContactInfo';
import emailjs from '@emailjs/browser';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Input, TextArea } from './Input';

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
          'service_fq4cchd',
          'template_f81r4zw',
          form.current,
          'FTSB3T9QVjfnESP97'
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div className="h-screen relative flex items-center justify-center gap-6 z-50 ">
      <div className="flex flex-col space-y-10 items-center">
        <h4 className="text-4xl font-semibold text-center relative w-fit mx-auto mt-12">
          Lets{' '}
          <span className="before:absolute before:w-1/2 before:h-1 before:rounded before:bg-red-500 before:top-[110%] before:-skew-y-3 -skew-y-6">
            talk
          </span>
        </h4>
        <div className="space-y-5">
          <ContactInfo
            text={personal.phoneNumber}
            Icon={<PhoneIcon className="w-8" />}
          />
          <ContactInfo
            text={personal.email}
            Icon={<EnvelopeIcon className="w-8" />}
          />
          <ContactInfo
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
            <Input
              label="user name"
              placeholder="user name"
              name="from_name"
              type="text"
            />
            <Input
              label="user email"
              placeholder="user email"
              name="from_email"
              type="text"
            />
          </div>

          <TextArea placeholder="message" name="message" label="message" />
          <button
            className="text-white font-black uppercase bg-sky-200/20 rounded py-5 active:scale-95 transition-all ease-linear"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
