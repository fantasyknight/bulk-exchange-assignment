import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button = ({ children, onClick, disabled, type }: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`text-center font-bold w-full p-3.5 rounded-xl flex items-center justify-center ${
      disabled
        ? " bg-slate-600 cursor-not-allowed text-white"
        : `${"bg-primary bg-opacity-10 text-primary cursor-pointer"} `
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
