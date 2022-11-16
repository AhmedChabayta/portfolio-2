import { ReactNode } from "react";

export default function NoSsr({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
