import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import User from '../../models/User';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsers, deleteUser } from "../../store/actions/UserActions";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Alerts from '../alert/Alerts';
import AlertMessage from './AlertMessage';
import { IndeterminateCheckBox } from '@material-ui/icons';

const UsersList = () => {

    const dispatch = useDispatch();
    // function createData(name, email, phone) {
    //     return { name, email, phone };
    // }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const [flag, setFlag] = React.useState(true);
    const { user } = useSelector(state => {
        return {
            user: state.user
        }
    }, shallowEqual);

    const [users, setUsers] = React.useState([]);
    let tempUsers = [];
    const [id, setId] = React.useState(null);
    // let rows = [];
    React.useEffect(() => {
        getUsers()
            .then(x => setUsers(x.data))
            .catch(err => console.log(err));


    }, []);
    const deleteU = (index) => {
        tempUsers = users;
        tempUsers.splice(index, 1);
        setUsers(tempUsers);
    }

    return (
        users.length ? <TableContainer component={Paper}>
            {console.log(users)}

            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">שם משתמש</StyledTableCell>
                        <StyledTableCell align="right">מייל</StyledTableCell>
                        <StyledTableCell align="right">פלאפון</StyledTableCell>
                        <StyledTableCell align="right">

                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row, index) => <StyledTableRow key={row.name}>
                        {/* <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell> */}
                        <StyledTableCell align="right">{row.Name}</StyledTableCell>
                        <StyledTableCell align="right">{row.Email}</StyledTableCell>
                        <StyledTableCell align="right">{row.Phone}</StyledTableCell>
                        {user.status == 3 ?
                            <StyledTableCell align="right">
                                <IconButton aria-label="delete" size="large">
                                    {id != row.Id && <DeleteIcon fontSize="inherit"
                                        onClick={() => {
                                            setId(row.Id);
                                            deleteU(index);
                                            deleteUser(row)
                                                .then(x => {
                                                    console.log("success"); tempUsers = users; tempUsers.splice(index, 1); setUsers(tempUsers);
                                                })
                                                .catch(err => console.log(err));
                                        }} />}
                                    {id == row.Id && <AlertMessage variant={'success'} children={<Alerts message={"המשתמש נמחק בהצלחה!"} />} />}
                                </IconButton>
                            </StyledTableCell> : null}
                    </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer> : null
    );
}

export default UsersList;