import * as React from 'react';
import { useEffect } from "react"
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { getAreas } from '../../store/actions/AreaAction';
import { getSeasons } from '../../store/actions/SeasonAction';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import './SideNavBar';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 220,
        },
    },
};

export default function CheckBoxList({ type, x, setX, func , flag}) {
    const [checked, setChecked] = React.useState([]);
    const [prev, setPrev] = React.useState([]);
    const [arr, setArr] = React.useState([]);
    const categories = useSelector(state => state.categoriesArr)
    const kind = type == 1 ? 'קטגוריה' : type == 2 ? 'אזור' : type == 3 ? 'עונות בשנה' : null;
    useEffect(() => {
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
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value);

        setChecked(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value);
        console.log(checked)
        const identityArr = [];
        arr.forEach(element => {
            if (value.indexOf(element.Name) != -1)
                identityArr.push(element.Id)
        });
        func(identityArr, type, prev.length < value.length ? "add" : "decrease");
        setPrev(value);
    };

    return (
        <div className='filter-container'>
            {flag==undefined && <Typography gutterBottom >
                     {kind}
                </Typography>}
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-checkbox-label">{kind}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={checked}
                    onChange={handleChange}
                    style={{color:"orange", borderColor:"orange",backgroundColor:"FEF1E5"}}
                    input={<OutlinedInput label={kind} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {arr.map(item => (
                        <MenuItem key={item.Id} value={item.Name} style={{backgroundColor:"FEF1E5"}}>
                            <Checkbox checked={checked.indexOf(item.Name) > -1} style={{color:"orange"}}/>
                            <ListItemText primary={item.Name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}