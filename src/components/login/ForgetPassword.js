import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PasswordReset from './PasswordReset';
import { getUserByEmail } from '../../store/actions/UserActions';
import { IconButton, SvgIcon } from '@material-ui/core';
import CancelIcon from  '@material-ui/icons/Cancel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ForgetPassword({ email, setOpen }) {
  const [mail, setMail] = React.useState(email);
  const [isError, setIsError] = React.useState(true);
  const [flag, setFlag] = React.useState(false);

  const resetPassword = () => {
    getUserByEmail(mail)
      .then(x => {
        if (x.data != null) {
          setIsError(true);
          setFlag(true);
        }
        else{
          setIsError(false);
          setFlag(false);
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div>
      <Modal
        keepMounted
        open={true}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
         {!flag?<> <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
         {/* <IconButton onClick={() => setOpen(false)}>
              <SvgIcon fontSize="large" >
                <CancelIcon></CancelIcon>
              </SvgIcon>
            </IconButton> */}
          <label className="small-text bold-text">הכנס כתובת מייל</label> <br/>
            <input type="text" defaultValue={mail} name="Email" onChange={(e) => { setMail(e.target.value); }}/>
          </Typography>
          {!isError ? <span style={{ color: "red" }}>משתמש זה אינו קיים</span> : null}
          <br/>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            <Button variant="contained" size="medium" onClick={resetPassword}>  איפוס סיסמא  </Button>
          </Typography></>:null}
          {flag ?
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <PasswordReset email={mail} setOpen={setOpen}/>
            </Typography> : null}
        </Box>
      </Modal>
    </div>
  );
}
