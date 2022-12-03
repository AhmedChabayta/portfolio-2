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
  const [value, setValue] = useState<string | undefined>();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <span className="relative my-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
        className="peer form-input my-4 rounded font-[800] text-black placeholder:opacity-0  lg:min-w-[250px]"
        type={type}
        placeholder={`${placeholder}`}
        name={name}
      />
      <label
        onClick={() => ref.current?.focus()}
        htmlFor={name}
        className={`${
          value ? 'top-0 left-0 text-white' : 'left-2 top-1/2 -translate-y-1/2'
        } absolute font-bold uppercase text-black transition-all duration-150 ease-linear peer-placeholder-shown:text-xs peer-focus:-top-0 peer-focus:text-white sm:peer-placeholder-shown:text-sm`}
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
  const [value, setValue] = useState<string | undefined>();
  const ref = useRef<HTMLInputElement>(null);
  const { current } = ref;
  useEffect(() => {
    if (current) {
      console.log(current);
    }
  }, [current]);

  return (
    <span className="relative mx-auto mt-4 flex">
      <TextareaAutosize
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="peer resize rounded font-black text-black placeholder:opacity-0 lg:min-h-[200px] lg:w-[500px] lg:min-w-[350px]"
        name={name}
      />
      <label
        htmlFor={name}
        className={`${
          value ? '-top-3 text-white' : 'left-2 top-1/2 '
        } absolute -translate-y-1/2 font-bold  uppercase text-black transition-all duration-150 ease-linear peer-placeholder-shown:text-xs peer-focus:-top-3 peer-focus:text-white sm:peer-placeholder-shown:text-sm`}
      >
        {label}
      </label>
    </span>
  );
};
