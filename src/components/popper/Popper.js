import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import '../navBar/NavBar.css';

import { IconButton, ListItem, ListItemText, Switch } from '@material-ui/core';
import './Popper.css';

export default function Poppers({ func, text, type, checked, setChecked, content, flag }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    // <Box sx={{ width: 200 }}>
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2, border: 1, bgcolor: 'background.paper', width: 200, height: 100 }} className="popperP">
                <span>האם אתה בטוח שברצונך ל{text}? </span><br />
                <Button variant="contained" size="small" style={{ margin: "3px" }} onClick={func}>  כן  </Button>
                <Button variant="contained" size="small" onClick={() => { setOpen(false) }}>  לא  </Button>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      {type == 1 ?
        <IconButton aria-label="delete" color="primary" onClick={handleClick('bottom-end')}>
          {content}
        </IconButton> : type == 2 ?
          <ListItem onClick={handleClick('bottom-end')} >
            <ListItemText id="switch-list-label-wifi" primary="פעיל" />
            <Switch
              edge="end"
              onChange={() => { setChecked(!checked) }}
              checked={checked}
              color="primary"
              // style={{color:"orange"}}
              // inputProps={{
              //   'aria-labelledby': 'switch-list-label-wifi',
              // }}
            />
          </ListItem> : type == 3 ?
            <Button variant="contained" size="medium" style={{backgroundColor:"orange"}} disabled={flag} onClick={handleClick('bottom-end')}>  {content}  </Button>
            : null}
      {/* </Box> */}
    </>
  );
}
