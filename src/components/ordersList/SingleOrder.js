import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProductFromWishList } from '../../store/actions/WishListAction';
import Poppers from '../popper/Popper';
import WriteOpinion from './WriteOpinion';
import { useState } from 'react';

export default function SingleOrder({ order, dateToEpoch }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [write,setWrite] = useState(false)
  const user = useSelector(state => state.user);
  const update = (item, type) => {
    const date = new Date();
    const isPossible = new Date(order.OrderDate).getDate() > new Date(date.setDate(date.getDate() + order.Attraction.DaysToCancel)).getDate();
    if (type == 1)
      if (isPossible)
        navigate("/order/" + false + "/" + 1 + "/" + item.AttractionId);
      else
        navigate("/message/" + item.Id + "/" + 1 + "/" + false);
    else
      if (isPossible)
        navigate("/message/" + item.Id + "/" + 0 + "/" + true);
      else
        navigate("/message/" + item.Id + "/" + 0 + "/" + false);

  }
  return (
    <Card sx={{ display: 'flex', width: '40vw', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {order.Attraction.Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            תאריך הזמנה: {new Date(order.OrderDate).toLocaleDateString()}
          </Typography>
          <Typography>
            מחיר : {order.GlobalPrice}
          </Typography>
          <Typography>
            כמות : {order.Amount}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left: '4rem' }}>
          {dateToEpoch(new Date(order.OrderDate)) >= dateToEpoch(new Date()) ? <>
            <Poppers func={() => { update(order, 1) }} type={3} text="עדכן את ההזמנה" content={"עדכן"} />
            <Poppers func={() => { update(order, 0) }} type={3} text="בטל את ההזמנה" content={"בטל"} />
          </> : null}
          {user.Status == 1 && !order.IsWritten && !write? 
            <WriteOpinion id={order.AttractionId} setWrite={setWrite}/>:null}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`http://localhost:81/img/${order.Attraction.Images.slice(0, 14)}`}
        alt={order.Attraction.Description}
        onClick={()=>{ navigate("/detailsAttraction/" + order.AttractionId) }}
      />
    </Card>
  );
}

