import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import AlertMessage from '../alert/AlertMessage';
import Typography from '@mui/material/Typography';
import Alerts from '../alert/Alerts';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { addReport, getKindsReports } from '../../store/actions/ReportAction';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
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

export default function ReportOpinion({ opinion }) {
  const attractionId = opinion.AttractionId;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = Boolean(anchorEl) ? 'simple-popper' : undefined;
  const user = useSelector(state => state.user);
  const [open2, setOpen2] = React.useState(false);
  const [arr, setArr] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [value, setValue] = React.useState('');
  const handleClose = () => setOpen2(false);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    getKindsReports()
      .then(x => setArr(x.data))
      .catch(err => console.log(err));
  }, []);

  const report = () => {
    setAnchorEl(anchorEl ? null : true);
    if (user == null)
      swal({ icon: 'warning', title: "יש להתחבר לאתר על מנת לדווח!" })
    else
      setOpen2(true);
  }

  const submit = () => {
    const r = arr.filter(x => x.Name == value);
    const report = { AttractionId: attractionId, ReportId: r[0].Id, UserId: user.Id, OpinionId: opinion.Id, Status: true };
    console.log(report);
    addReport(report)
      .then(x => setFlag(true))
      .catch(err => console.log(err));
    setTimeout(() => {
      handleClose();
    }, 3000)
  }

  return <div>
    <MoreHorizIcon onClick={handleClick} aria-describedby={id} />
    <Popper id={open ? 'simple-popper' : undefined} open={open} anchorEl={anchorEl}>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Button variant='contained' onClick={report}>דווח</Button>
      </Box>
    </Popper>

    <Modal
      open={open2}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ textAlign: "center" }}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          דווח
        </Typography>
        בחר את הסיבה לדיווח:
        <br />

        {arr.length > 0 ? <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange} >
          {arr.map(item => <FormControlLabel key={item.Id} value={item.Name}
            control={<Radio />} label={item.Name} style={{ margin: "0.3rem" }} />)}
        </RadioGroup> : null}

        {flag ? <AlertMessage variant={'success'}
          children={<Alerts message={"הדוח הצליח. תודה על המשוב שלך. אנו נוודא בהקדם האפשרי."} />} />
          : <Button variant='contained'
            size='large'
            disabled={value == ''}
            onClick={submit} >הגש</Button>}
      </Box>
    </Modal>
  </div>
}
