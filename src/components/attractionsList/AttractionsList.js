import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SingleAttraction from "./SingleAttraction";
import SearchButton from './SearchButton';
import SelectTextFields from './SelectTextFields';
import './AttractionsList.css';
import '../sideNavBar/SideNavBar.css'
import SideNavBar from '../sideNavBar/SideNavBar';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
const currencies = [
    {
        Id: 'REC',
        Name: 'מומלץ'
    },
    {
        Id: 'CHE',
        Name: 'מהזול ליקר',
    },
    {
        Id: 'EXP',
        Name: 'מהיקר לזול',
    },
    {
        Id: 'CHI',
        Name: 'מתאים לילדים',
    },
];
export default function AttractionsList() {
    const { type, area } = useParams();
    const [searchValue, setSearchValue] = useState('');
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);
    const [fromAge, setFromAge] = useState(0);
    const [tillAge, setTillAge] = useState(99);
    const [categoryArr, setCategoryArr] = useState(null);
    const [areaArr, setAreaArr] = useState(null);
    const [seasonArr, setSeasonArr] = useState(null);
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [arr, setArr] = useState([]);
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    const { user, attractions } = useSelector(state => {
        return {
            user: state.user,
            attractions: state.attractionArr
        }
    }, shallowEqual);

    useEffect(() => {
        const m = Math.max(...attractions.map(o => o.Price));
        setMax(m)
        handleChange({ target: { value: 'REC' } });
    }, [attractions, type]);

    useEffect(() => {
        if (area) { setAreaArr([parseInt(area)]); setCount(1); }
    }, [type]);

    const handleChange = ({ target }) => {
        let attractionCopy = [];
        if (type == 0)
            attractionCopy = attractions.filter(x => x.Status == true);
        else
            if (type == 2)
                attractionCopy = [...attractions];
            else
                attractionCopy = attractions.filter(x => x.ManagerId == user.Id && x.Status == true)
        switch (target.value) {
            case 'REC': attractionCopy.sort((a, b) => b.CountAvgGrading - a.CountAvgGrading); break;
            case 'CHE': attractionCopy.sort((a, b) => a.Price - b.Price); break;
            case 'EXP': attractionCopy.sort((a, b) => b.Price - a.Price); break;
            case 'CHI':
                attractionCopy = arr.filter(element => element.FromAge >= 2 && element.TillAge<=12); break;
        }
        setArr(attractionCopy)
    }

    const filterArr = (array, type, x) => {
        const a = array.length > 0 ? array : null;
        switch (type) {
            case 1: setCategoryArr(a);
                break;
            case 2: setAreaArr(a)
                break;
            case 3:
                setSeasonArr(a);
                break;
            case 4: setMin(array[0]); setMax(array[1]);
                break;
            case 5: setFromAge(array[0]); setTillAge(array[1])
                break;
            default:
                break;
        }
        if (type == 4 && !flag1) {
            setFlag1(true);
            setCount(count + 1);
        }

        if (type == 5 && !flag2) {
            setFlag2(true);
            setCount(count + 1);
        }
        if (type != 4 && type != 5)
            setCount(x == "add" ? count + 1 : count - 1);
    };

    const zero = () => {
        setCount(0);
        setMin(0);
        setMax(Math.max(...arr.map(o => o.Price)));
        setTillAge(99);
        setFromAge(0);
        setCategoryArr(null);
        setSeasonArr(null);
        setAreaArr(null);
        setFlag1(false);
        setFlag2(false);
    };

    return <div >
        {count > 0 && <span className='filterButton'>
            <Button size="large" variant="contained" onClick={() => { setFlag(true); zero(); }} style={{ backgroundColor: "orange", color: "white" }}>
                נקה הכל ({count}) </Button>
        </span>}

        <SideNavBar filterArr={filterArr} flag={flag} setFlag={setFlag} />
        <div className="selectButton">
            <SelectTextFields handleChange={handleChange} currencies={currencies} text={"סינון"} />
        </div>

        <div className="searchButton">
            <SearchButton search={({ target }) => setSearchValue(target.value)} />
        </div>

        <div className="product-list">
            {arr.length > 0 ? arr.map(item => {
                if (item.Name.includes(searchValue) &&
                    max >= item.Price && min <= item.Price &&
                    (fromAge == 0 || (fromAge >= item.FromAge && fromAge <= item.TillAge
                        && tillAge <= item.TillAge)) &&
                    (!categoryArr || categoryArr.includes(item.CategoryId)) &&
                    (!seasonArr || seasonArr.every(v => item.Seasons.includes(v))) &&
                    (!areaArr || areaArr.includes(item.AreaId)))
                    return <div key={item.Id} className="container"> <SingleAttraction product={item} type={type} />
                    </div>
            }) : <div className="emptyMessage"> <p> רשימת האטרקציות שלך ריקה. </p> </div>}</div>
    </div>
}
