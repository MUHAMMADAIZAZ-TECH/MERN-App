import * as React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({
    text,
    icon,
    onClick,
    endIcon,
    disableBtn,
    size,
    fullWidth,
    align,
    variant,
})=> {
  return (
      <Button 
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        startIcon={icon ? icon : null}
        disabled={disableBtn}
        onClick={onClick}
        endIcon={endIcon ? endIcon : null}
        align={align}>
        {text}
        </Button>
  );
}
export default CustomButton;