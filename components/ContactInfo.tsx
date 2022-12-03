import { Tooltip } from '@mui/material';
import { ReactNode } from 'react';

export default function ContactInfo({
  Icon,
  text,
  title,
  setShowSnackbar,
}: {
  Icon: ReactNode;
  text: string | number;
  title: string;
  setShowSnackbar?: (_arg0: boolean) => void;
}) {
  return (
    <Tooltip title={title}>
      <div
        onClick={() => {
          if (setShowSnackbar != null) {
            navigator.clipboard.writeText(text.toString());
            setShowSnackbar(true);
          }
        }}
        className="flex items-center space-x-4 select-all font-sans"
      >
        {Icon}
        <p className="text-xl">{text}</p>
      </div>
    </Tooltip>
  );
}
