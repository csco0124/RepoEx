// interface
import type { SearchBarContainer } from './interface';
import type { TextFieldProps } from '@mui/material/TextField';
// components
import TextField from '@mui/material/TextField';
// validate
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// presentation
import SearchBarPresentation from './SearchBarPresentation';

// zod object 생성
const schema = z.object({});

const SearchFilterContainer = (props: SearchBarContainer) => {
  const { fieldList, title } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // errors 객체를 사용하여 각 템플릿 필드의 오류메시지 표시 가능
  } = useForm<TextFieldProps>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <SearchBarPresentation title={title} handleSubmit={handleSubmit} reset={reset}>
        {fieldList.map((textfieldProps: TextFieldProps) => (
          <TextField
            helperText={errors[textfieldProps?.type]?.message}
            {...register(textfieldProps.type)}
            {...textfieldProps}
          />
        ))}
      </SearchBarPresentation>
    </>
  );
};

export default SearchFilterContainer;
