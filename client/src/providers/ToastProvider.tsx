import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface IProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: IProps) {
  return (
    <>
      {children}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
