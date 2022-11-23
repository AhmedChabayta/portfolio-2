import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Personal } from '../types/typings';
import ContactInfo from './ContactInfo';

interface Inputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface PersonalProps {
  personal: Personal;
}

export default function ContactMe({ personal }: PersonalProps) {
  const { register, handleSubmit } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailTo:chabays@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message}`;
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-fit mx-auto bg-sky-200/30 p-10 rounded backdrop-blur-3xl"
        >
          <div className="flex space-x-2">
            <input
              {...register('name')}
              placeholder="Name"
              className="contact-inputs"
              type="text"
            />
            <input
              {...register('email')}
              placeholder="E-mail"
              className="contact-inputs"
              type="email"
            />
          </div>
          <input
            {...register('subject')}
            placeholder="Subject"
            className="contact-inputs"
            type="text"
          />
          <textarea
            {...register('message')}
            placeholder="Message"
            className="contact-inputs"
          />
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
