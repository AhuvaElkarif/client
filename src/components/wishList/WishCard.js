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

export default function WishCard({ item , ind}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  user = useSelector(state => state.user);
  return (
    <Card sx={{ display: 'flex', width: '45vw', flexDirection: 'row', height:"25vh" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width:"30vw" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {item.Address}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left:'4rem' }}>
          <Poppers func={()=>{dispatch(deleteProductFromWishList(user, item.Id))}} type={1} text="מחוק" content={<DeleteIcon style={{color:"orange"}}/>}/>
          <Button size="small" variant="contained" style={{backgroundColor:"orange"}}onClick={() => navigate("/order/" + false + "/" + 0 + "/" + item.Id)}>  הזמן  </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "20vw", height:"25vh"}}
        image={item.Images!=""?`http://localhost:81/img/${item.Images.slice(0, 14)}`:"../../../images/camera2.webp"}
        alt={item.Description}
        style={{cursor:"pointer"}}
        onClick={()=> navigate("/detailsAttraction/"+item.Id)}
      />

    </Card>
  );
}
