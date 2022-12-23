import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../opinion/Opinion.css";
import HoverRating from './HoverRating';
import AlertMessage from '../alert/AlertMessage';
import Alerts from '../alert/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { addOpinion } from '../../store/actions/OpinionsActions';
import { Fragment } from 'react';
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

export default function WriteOpinion({ id, setWrite }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); setWrite(true)};
    const [value, setValue] = React.useState(2);
    const [text, setText] = React.useState('');
    const [flag, setFlag] = React.useState(0);
    const user = useSelector(state => state.user);
    const handleChange = (event) => {
        setText(event.target.value);
        if (event.target.value)
            setFlag(0);
    };
    const submit = () => {
        if (text.length == '')
            setFlag(1);
        else {
            setFlag(2);
            var nowDate = new Date();
            var d = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();
            const o = { OpinionText: text, AttractionId: id, Grading: value, UserId: user.Id, InsertDate: d, Status: true };
            addOpinion(o)
                .then(x => console.log(x))
                .catch(err => console.log(err));
            setTimeout(() => {
                handleClose();
            }, 3000)
        }
    }
    return (
        <Fragment>
            <Button variant="contained" size="medium" style={{backgroundColor:"orange"}} onClick={handleOpen}> כתוב חוות דעת</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{textAlign:"center"}}>
                        <h3>דירוג האטרקציה:  </h3>
                        <HoverRating value={value} setValue={setValue} /> <br />
                        <TextField
                            id="outlined-textarea"
                            label="חוות דעת"
                            placeholder="כתוב חוות דעת"
                            onChange={handleChange}
                            multiline
                        /><br />
                        {flag == 1 && <span style={{ color: "red" }}>יש למלא את כל השדות</span>}
                        <br /> <br />
                        {flag != 2 ? <Button variant="contained" size="large" onClick={submit} style={{backgroundColor:"orange"}}> הגש </Button>
                            : <AlertMessage variant={'success'} children={<Alerts message={"חוות הדעת שלך התווספה בהצלחה!"} />} />}
                    </Box>
                </Fade>
            </Modal>
        </Fragment>
    );
}
