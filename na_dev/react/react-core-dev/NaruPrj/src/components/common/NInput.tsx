import React, {ChangeEvent, forwardRef} from "react";
import ValidMessageDiv from "./ValidMessageDiv";

export type InputValue = string | number | ReadonlyArray<string>
export type InputChangeEvent = ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  disabled?: boolean;
  message?: string;
  value?: InputValue;
  validType?: string;
  valid?: (value: any) => boolean;
  onChange?: (e: InputChangeEvent) => void;
}

const InputText = forwardRef<HTMLInputElement, InputProps> ((props: InputProps, ref) => {
    const {validType, disabled, message, value = '', onChange, valid, ...restProps} = props;

    const changeHandler = (e: InputChangeEvent) => {
      onChange?.(e);
    }

    return (
      <ValidMessageDiv validType={valid?.(value) ? validType : ''} message={message}>
        <input
          type="text"
          disabled={disabled}
          onChange={changeHandler}
          ref={ref}
          {...restProps}
        />
      </ValidMessageDiv>
    );
  }
);

export default InputText;