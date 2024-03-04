import { InputType } from "@/utils/types";
import { ForwardedRef, forwardRef } from "react";

interface InputProps {
  type?: InputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input = forwardRef(
  (
    { type, value, onChange, placeholder, required, disabled }: InputProps,
    forwardedRef?: ForwardedRef<HTMLInputElement>
  ) => (
    <input
      ref={forwardedRef ?? undefined}
      type={type || "text"}
      placeholder={placeholder}
      className={`border-grayTint border-2 py-3.5 w-full pr-5 rounded-xl pl-5`}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  )
);

Input.displayName = "Input";

export default Input;
