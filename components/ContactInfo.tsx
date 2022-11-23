import { ReactNode } from 'react';

export default function ContactInfo({
  Icon,
  text,
}: {
  Icon: ReactNode;
  text: string | number;
}) {
  return (
    <div className="flex items-center space-x-4">
      {Icon}
      <p className="text-xl">{text}</p>
    </div>
  );
}
