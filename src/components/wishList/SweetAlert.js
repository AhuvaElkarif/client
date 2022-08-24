import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(true);
  React.useEffect(()=>{
    // swal({
    //     title: "שים לב!",
    //     text: "היות והנך משתמש לא רשום הפריטים שברשימת המשאלות לא ישמרו",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //   })
    //   .then((willDelete) => {
    //     if (willDelete) {
    //       swal("Poof! Your imaginary file has been deleted!", {
    //         icon: "success",
    //       });
    //     } else {
    //       swal("Your imaginary file is safe!");
    //     }
    //   });

  },[])
  
  return (
      <Collapse in={open}>
      <CloseIcon fontSize="inherit" onClick={()=>{setOpen(false)}} />

      </Collapse>
  );
}
