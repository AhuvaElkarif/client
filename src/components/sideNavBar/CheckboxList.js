import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { getCategories } from '../../store/actions/CategoryAction';
import MaximizeIcon from '@mui/icons-material/Maximize';
import AddIcon from '@mui/icons-material/Add';
import './List.css';
import { Button, Grid } from '@material-ui/core';
import { getAreas } from '../../store/actions/AreaAction';
import { getSeasons } from '../../store/actions/SeasonAction';
import SelectTextFields from '../attractionsList/SelectTextFields';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '9rem',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CheckboxList({ func, type, x, setX }) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [arr, setArr] = React.useState([]);
    const [flag, setFlag] = React.useState(true);
    const categories = useSelector(state=> state.categoriesArr)                    

    React.useEffect(() => {
        switch (type) {
            case 1:
                setArr(categories);
                break;
            case 2:
                getAreas()
                    .then(x => setArr(x.data))
                    .catch(err => console.log(err));
                break;
            case 3:
                getSeasons()
                    .then(x => setArr(x.data))
                    .catch(err => console.log(err));
                break;
            default:
                break;
        }
    }, [])
    useEffect(() => {
        if (x) {
            setChecked([]);
            setX(false);
        }
    }, [x])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1)
            newChecked.push(value);
        else
            newChecked.splice(currentIndex, 1);
        setChecked(newChecked);
        const identityArr = newChecked.map(x => x.Id)
        func(identityArr, type, currentIndex === -1 ? "add" : "decrease");
    };

    return (
        <List className={classes.root}>
            <Grid container spacing={9} alignItems="center">
                <Grid item xs={8} md={8}>
                    <p className="categoryP" onClick={() => { setFlag(!flag) }}>{type == 1 ? 'קטגוריה' : type == 2 ? 'אזור' : type == 3 ? 'עונות בשנה' : null}</p>
                </Grid>
                <Grid item xs={4} md={4}>
                    {flag ? <MaximizeIcon sx={{ fontSize: 16, position: 'relative', top: '0.5rem' }} onClick={() => { setFlag(!flag) }} />
                        : <AddIcon sx={{ fontSize: 16 }} onClick={() => setFlag(!flag)} />}
                </Grid>
            </Grid>
            {arr&& flag ? arr.map(value => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <ListItem key={value.Id} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.Name} />
                    </ListItem>
                );
            }) : null}
        </List>
    );
}