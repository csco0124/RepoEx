import React, {ChangeEvent, forwardRef} from "react";

export type InputValue = string | number | ReadonlyArray<string>
export type InputChangeEvent = ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>

interface InputProps {
  name?: string;
  isError?: boolean;
  disabled?: boolean;
  placeholder?: string;
  message?: string;
  isSuccess?: boolean;
  isInfo?: boolean;
  value?: InputValue;
  onChange?: (e: InputChangeEvent) => void;
}

const InputText = forwardRef<HTMLInputElement, InputProps> ((props: InputProps, ref) => {
  const {isError, isSuccess, isInfo, disabled, name, message, value = '', placeholder = '', onChange} = props;

  const changeHandler = (e: InputChangeEvent) => {
    onChange?.(e);
  }

  return (
    <div className={`form-input ${isError ? 'error' : ''} ${isSuccess ? 'success' : ''} ${isInfo ? 'info' : ''}`}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={changeHandler}
        ref={ref}
      />
      {(isError || isInfo) &&  (<p className="message">{message || 'message is a required field'}</p>)}
    </div>
  );
}
);

export default InputText;