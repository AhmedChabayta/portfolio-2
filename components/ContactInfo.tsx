import { Tooltip } from '@mui/material';
import { ReactNode } from 'react';

export default function ContactInfo({
  Icon,
  text,
  title,
}: {
  Icon: ReactNode;
  text: string | number;
  title: string;
}) {
  return (
    <Tooltip title={title}>
      <div className="flex items-center space-x-4">
        {Icon}
        <p className="text-xl">{text}</p>
      </div>
    </Tooltip>
  );
}
