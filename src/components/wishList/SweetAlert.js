import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open}>
      <CloseIcon fontSize="inherit" onClick={() => { setOpen(false) }} />
    </Collapse>
  );
}
