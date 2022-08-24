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
import { deleteProductFromWishList } from '../../store/actions/WishListAction';

export default function WishCard({ item , ind}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  return (
    <Card sx={{ display: 'flex', width: '40vw', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {item.Address}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, left:'4rem' }}>
          <Button variant="contained" size="small" onClick={()=>{dispatch(deleteProductFromWishList(user, item.Id, ind))}}>  מחק  </Button>
          <Button variant="contained" size="small" onClick={() => navigate("/order/" + false + "/" + 0 + "/" + item.Id)}>  הזמן  </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`C:\\inetpub\\wwwroot\\image\\${item.Images.slice(0,14)}`}
        alt={item.Description}
      />

    </Card>
  );
}
