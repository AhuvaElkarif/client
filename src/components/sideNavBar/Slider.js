import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 0;

export default function MinimumDistanceSlider({ func, x, setX }) {
  const [max, setMax] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [value, setValue] = React.useState([max, min]);
  const attractions = useSelector(state => state.attractionArr);

  React.useEffect(() => {
    if (x)
      setX(false);
    setMax(Math.max(...attractions.map(o => o.Price)))
    setMin(Math.min(...attractions.map(o => o.Price)))
  }, [attractions, x]);
    React.useEffect(()=>{
      setValue([max, min]);
    },[max,min])
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
    func(value, 4)

  };


  

  return (
    <div className='filter-container'>
      <Typography gutterBottom > 
        טווח מחירים
        </Typography>
    <Box sx={{ width: 200 }}>
      
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={min}
        max={max}
      />
    </Box>
    </div>
  );
}
