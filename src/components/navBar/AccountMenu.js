import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { currentUser } from '../../store/actions/UserActions';
import '../App.css';
export default function AccountMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(state => state.user);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const arr = [
    {name:"פרופיל", to:"/regions", icon: <Avatar />, role:[1,2]},
    {name:"ההזמנות שלי", to:"/orderList/"+0, icon: <Avatar />, role:[1]},
    {name:"הזמנות לקוחות", to:"/orderList/"+1, icon: <Avatar />, role:[1]},
    {name:"האטרקציות שלי", to:"/attractionsList/"+1, icon:  <PersonAdd fontSize="small" />, role:[1]},
    {name:"אישורי לקוחות", to:"/usersApprovals", icon: <PersonAdd fontSize="small" />, role:[1]},
    {name:"הוספת אטרקציה", to:"/editAttraction", icon:   <AddCircleOutlineIcon fontSize="small" />, role:[1,2]},
    {name:"עריכת אודות", to:"/about/edit", icon:    <Settings fontSize="small" />, role:[2]},
    {name:"אפשרויות נוספות", to:"/reportsList", icon:   <Settings fontSize="small" />, role:[2]},
    
  ]
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="החשבון שלי">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar />
            {/* <Avatar sx={{ width: 32, height: 32 }}>{user.Name[0]}</Avatar> */}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              left: 15,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {arr.map(x => {
            return x.role.map(item => {
                if (item == user.Status) return <MenuItem onClick={()=> navigate(`${x.to}`)}>
               {x.icon} {x.name} 
              </MenuItem>
            })
        })}
        {/* <MenuItem onClick={()=>navigate("/regions")}>
          <Avatar />  פרופיל
        </MenuItem>
        {user.Status!=2 && <> <MenuItem onClick={()=> navigate("/orderList/"+0)}>
          <Avatar /> ההזמנות שלי 
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=> navigate("/orderList/"+1)}>
          <Avatar /> הזמנות לקוחות 
        </MenuItem>
       <MenuItem onClick={()=> navigate("/attractionsList/"+1)}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          האטרקציות שלי
        </MenuItem> 
        <MenuItem onClick={()=> navigate("/usersApprovals")}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
            אישורי לקוחות
        </MenuItem> </>}
        <MenuItem onClick={()=> navigate("/editAttraction")}>
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
            הוספת אטרקציה
        </MenuItem> 
        {user.Status==2 &&<><MenuItem onClick={() => navigate("/about/"+"edit")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          עריכת  אודות
        </MenuItem>
        <MenuItem onClick={()=> navigate("/reportsList")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
         אפשרויות נוספות
        </MenuItem>
        </> } */}
        <MenuItem onClick={() => { dispatch(currentUser(null)); navigate('/attractionsList/'+0)}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          יציאה
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
