import { Input } from '@chakra-ui/react';
import { forwardRef } from 'react';

function TextInput({ name, value, onChange, placeholder, ...props }, ref) {
  return (
    <Input
      {...props}
      type="text"
      name={name}
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      autoComplete="off"
    />
  );
}

export default forwardRef(TextInput);
