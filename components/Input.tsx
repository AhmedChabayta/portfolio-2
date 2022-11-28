import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export const Inputs = ({
  label,
  placeholder,
  type,
  name,
}: {
  label: string;
  placeholder: string;
  type: string;
  name: string;
}) => {
  const [value, setValue] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);

  return (
    <span className="relative my-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
        className="form-input peer placeholder:opacity-0 text-black"
        type={type}
        placeholder={`${placeholder}`}
        name={name}
      />
      <label
        onClick={() => ref.current?.focus()}
        htmlFor={name}
        className={`${
          value ? '-top-3 text-white' : ''
        } absolute left-2 top-1/2 text-gray-500 -translate-y-1/2 peer-placeholder-shown:text-xs transition-all duration-150 ease-linear peer-focus:-top-3 peer-focus:text-white uppercase`}
      >
        {label}
      </label>
    </span>
  );
};

export const TextArea = ({
  placeholder,
  name,
  label,
}: {
  placeholder: string;
  name: string;
  label: string;
}) => {
  const [value, setValue] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);
  const { current } = ref;
  useEffect(() => {
    if (current) {
      console.log(current);
    }
  }, [current]);
  console.log(value);
  return (
    <span className="flex relative w-full mx-auto mt-4">
      <TextareaAutosize
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="form-input text-black resize w-full min-h-[200px] peer placeholder:opacity-0"
        name={name}
      />
      <label
        htmlFor={name}
        className={`${
          value ? '-top-3 text-white' : 'text-gray-500'
        } absolute left-2 top-1/2 -translate-y-1/2 peer-placeholder-shown:text-xs transition-all duration-150 ease-linear peer-focus:-top-3 peer-focus:text-white uppercase`}
      >
        {label}
      </label>
    </span>
  );
};
