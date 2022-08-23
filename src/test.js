import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux'
import AdbIcon from '@mui/icons-material/Adb';
import { SvgIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';



const arr = [
    { to: "homePage", name: "דף הבית", role: [0, 1, 2, 3] },
    { to: "regions", icon: "PersonIcon", role: [0, 1] },
    // { to: "regions", name: <SvgIcon component={ApprovalIcon} inheritViewBox></SvgIcon>, role: [0, 1, 2, 3] },
    {
        to: "attractionsList", name: "אטרקציות", role: [0, 1, 2, 3], arr: [
            { to: "attractionsList/1", name: "צפון", role: [0] },
            { to: "login", name: "דרום", role: [0] },
            { to: "login", name: "מזרח", role: [0] },

        ]
    },
    {
        name: "משתמש", role: [0],
        arr: [{ to: "register", name: "הרשמה", role: [0] },
        { to: "login", name: "התחברות", role: [0] },
        ]
    },
    { to: "about", name: "אודות", role: [0, 1] },
    { to: "wishList", name: "❤", role: [0, 1] },
    { to: "orderList", name: "הזמנות", role: [1, 2, 3] },
    { to: "statistics", name: "סטטיסטיקות", role: [2, 3] },
    { to: "editAttraction", name: "הוספת אטרקציה", role: [2] },
    { to: "usersList", name: "מנהלי אטרקציות", role: [3] },
    { to: "register", name: "הוספת מנהל אטרקציה", role: [3] },
    { to: "exit", name: "יציאה", role: [1, 2, 3] }
];

const ResponsiveAppBar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    let user = useSelector(state => state.user);
    if (user == null)
        user = { status: 0 };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {arr.map(x =>
                        x.role.includes(user.status) ?
                            <Box sx={{ flexGrow: 0 }}>
                                {console.log(x.role, user.status)}
                                {/* <Tooltip title="Open settings"> */}
                                {x.icon ?
                                    <SvgIcon component={x.icon} inheritViewBox></SvgIcon> :
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        component="a"

                                        sx={{
                                            mr: 2,
                                            display: { xs: 'flex', md: 'none' },
                                            flexGrow: 1,
                                            fontFamily: 'monospace',
                                            // fontWeight: 5,
                                            // letterSpacing: '.3rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                        onClick={(event) => x.arr ? setAnchorElUser({ value: event.currentTarget, name: x.name }) : null}
                                    >
                                        {x.name}
                                    </Typography>}

                                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton> */}
                                {/* </Tooltip> */}
                                {x.arr ? <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser?.value}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser?.name === x.name)}
                                    onClose={() => setAnchorElUser(null)}
                                >
                                    {x.arr.map((setting) => (
                                        <MenuItem key={setting.name} onClick={() => setAnchorElUser(null)}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu> : null}
                            </Box> : null)}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
