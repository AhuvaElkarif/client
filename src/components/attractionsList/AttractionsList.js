import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Buttons from "./Buttons";
import SingleAttraction from "./SingleAttraction";
import { getAttractions, getAttractionsByUserId } from "../../store/actions/AttractionActions";
import SearchButton from './SearchButton';
import SelectTextFields from './SelectTextFields';
import './AttractionsList.css';

export default function AttractionsList() {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState('REC');
    const [arr, setArr] = useState([]);
    const { user, attractions } = useSelector(state => {
        return {
            user: state.user,
            attractions: state.attractionArr
        }
    }, shallowEqual);

    useEffect(() => {
        if (user == null || user.Status == 1 || user.Status == 3)
            dispatch(getAttractions());
        else
            dispatch(getAttractionsByUserId(user.Id));
    }, [])

    useEffect(() => {
        setArr(attractions);
        handleChange('REC');
    }, [attractions])


    const handleChange = ({ target }) => {
        let attractionCopy = [...attractions];
        if (target == undefined)
            target = { value: 'REC' };
        setCurrency(target.value);
        switch (target.value) {
            case 'REC': attractionCopy.sort((a, b) => b.CountAvgGrading - a.CountAvgGrading); break;
            case 'CHE': attractionCopy.sort((a, b) => a.Price - b.Price); break;
            case 'EXP': attractionCopy.sort((a, b) => b.Price - a.Price); break;
            case 'CHI':
                attractionCopy = attractions.filter(element => element.FromAge >= 5); break;
            case 'FAM':
                attractionCopy = attractions.filter(element => element.FromAge >= 2 && element.TillAge <= 99); break;

        }
        setArr(attractionCopy)
    }

    const search = (e) => {
        e.preventDefault();
        let i, v = [];
        setArr([...attractions]);
        if (e.target.value != "") {
            const value = e.target.value;
            for (i = 0; i < attractions.length; i++) {
                if (attractions[i].Name.includes(value))
                    v = [...v, attractions[i]];
            }
            setArr(v);
        }
        else
            setArr([...arr]);
    }

    return (<>
        <SelectTextFields handleChange={handleChange} />
        <SearchButton search={search} />
        <div className="product-list">
            {arr != null ? arr.map(item => {
                return <div key={item.Id} className="container"> <SingleAttraction product={item} />
                </div>
            }) : null}</div>
    </>
    );
}
