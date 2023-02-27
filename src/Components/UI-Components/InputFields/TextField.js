import * as React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({
  ref,
  id,
  focus,
  value,
  label,
  width,
  required,
  disable,
  type,
  size,
  helper,
  error,
  fullWidth,
  multiline,
  rows,
  placeholder,
  textLength,
  margin,
  change,
  name,
  variant,
  color
})=> {
  return (
    
       <TextField
        ref={ref && ref}
        id={id && id}
        onFocus={focus}
        name={name && name}
        onChange={change}
        style={{ width: `${width}`, margin: `${margin}`,backgroundColor:`${color}` }}
        placeholder={placeholder && placeholder}
        rows={rows}
        multiline={multiline}
        autoFocus={focus}
        value={value === null ? "" : value}
        fullWidth={fullWidth}
        label={label}
        variant={variant}
        size={size}
        helperText={error && helper}
        error={error}
        type={type}
        disabled={disable}
        required={required}
        inputProps={{ maxLength: textLength }}
      />
  );
}

export default TextInput;