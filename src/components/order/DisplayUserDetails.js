import { Grid } from "@material-ui/core";
import { shallowEqual, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const DisplayUserDetails = () => {
    const { user } = useSelector(state => {
        return {
            user: state.user
        }
    }, shallowEqual);
    return (
        <Grid container spacing={2}>
            <Grid xs={6} >
                <p>שם מלא</p>
                <Item>xs=6 md=8</Item>
            </Grid> |
            <Grid xs={6} >
            <p>פלאפון </p>
                <Item>xs=6 md=4</Item>
            </Grid>
        </Grid>

    )
}
export default DisplayUserDetails;