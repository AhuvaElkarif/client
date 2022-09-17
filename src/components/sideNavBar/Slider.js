import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    width: 250,
  }
});

export default function MinimumDistanceSlider({ func, x, setX }) {

  const classes = useStyles();
  const [max, setMax] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [value, setValue] = React.useState([max, min]);
  const minDistance = 0;

  const attractions = useSelector(state => state.attractionArr);

  React.useEffect(() => {
    if (x)
      setX(false);
    setValue([max, min]);
    setMax(Math.max(...attractions.map(o => o.Price)))
    setMin(Math.min(...attractions.map(o => o.Price)))
  }, [attractions, x]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0)
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    else
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    func(value, 4)
  };


  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        טווח מחירים
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          {max}₪
        </Grid>
        <Grid item xs={4}>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={min}
            max={max}
          />
        </Grid>
        <Grid item xs={3}>
          {min}₪
        </Grid>
      </Grid>
    </div>
  );
}
