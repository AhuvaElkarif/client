import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CategoryCard({item}) {
  return (
    <Card sx={{ maxWidth: 250, margin:"1rem" ,padding:0}} >
      <CardActionArea style={{display:"flex", flexDirection:"column"}}>
        <CardMedia
          component="img"
          height="140"
          image = {item.Img? `http://localhost:81/img/${item.Img}`:"../../../images/camera2.webp"}
          alt={item.Name}
        />
        <CardContent> 
          <Typography gutterBottom variant="h5" component="div">
            {item.Name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
