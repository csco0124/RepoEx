// form
import { useFormContext, Controller } from 'react-hook-form';

// ----------------------------------------------------------------------

interface IRHFTextField {
  name: string;
  [key: string]: string | number;
}

export default function RHFTextField({ name, ...other }: IRHFTextField) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`form-input ${ error?.message ? 'error' : ''}`}>
          <input type="text" {...field} {...other} autoComplete="off"/>
          <p className="message">{error?.message}</p>
        </div>
      )}
    />
  );
}
