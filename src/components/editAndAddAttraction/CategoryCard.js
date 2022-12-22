import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CategoryCard({item}) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image = { `http://localhost:81/img/${item.Img}`}
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
