import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  Login  from '../login/Login';
import Register from '../register/Register';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'normal',

};

export default function RegisterAndLogin() {
    const [open, setOpen] = React.useState(false);
    const {id} = useParams();
    //   const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        setOpen(true);
    }, [])
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Login style={{width:'20vw', height:'30vh'}} type={3} id={id}/>
                    <Register style={{width:'20vw', height:'30vh'}} type={3} id={id}/>
                </Box>
            </Modal>
        </div>
    );
}
