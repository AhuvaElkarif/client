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

export default function SingleOrder({ order, dateToEpoch, type}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [write,setWrite] = useState(false)
  const user = useSelector(state => state.user);
  const update = (item, type) => {
    const date = new Date();
    const isPossible = new Date(order.OrderDate) > new Date(date.setDate(date.getDate() + order.Attraction.DaysToCancel));
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
    <Card sx={{ display: 'flex', width: '45vw', height:"32vh", flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: "25vw"}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {order.Attraction.Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            תאריך הזמנה: {new Date(order.OrderDate).toLocaleDateString()}
          </Typography>
          {type == 1 &&  <Typography>
            משתמש : {order.UserName}
          </Typography>}
          <Typography>
            זמן התחלה : {order.StartTime.slice(0,5)}
          </Typography>
          <Typography>
            מחיר : {order.GlobalPrice}
          </Typography>
          <Typography>
            כמות : {order.Amount}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1,position:"relative",bottom:"1.4rem",right: '1rem'}}>
          {type != 1 && dateToEpoch(new Date(order.OrderDate)) >= dateToEpoch(new Date()) ? <>
           <span> <Poppers func={() => { update(order, 1) }} type={3} text="עדכן את ההזמנה" content={"עדכן"} /></span>
           <span style={{margin:"1rem"}}> <Poppers func={() => { update(order, 0) }} type={3} text="בטל את ההזמנה" content={"בטל"} /></span>
          </> : null}
          {type != 1 && !order.IsWritten && !write? 
            <WriteOpinion id={order.AttractionId} setWrite={setWrite}/>:null}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "20vw" }}
        image={order.Attraction.Images!=""?`http://localhost:81/img/${order.Attraction.Images.slice(0, 14)}`:"../../../images/camera2.webp"}
        alt={order.Attraction.Description}
        onClick={()=>{ navigate("/detailsAttraction/" + order.AttractionId) }}
      />
    </Card>
  );
}

