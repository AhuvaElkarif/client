import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router";
import "./SingleAttraction.css";
import Buttons from './Buttons';
export default function SingleAttraction({ product , type}) {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardHeader
                title={product.CategoryName}
                subheader={product.Name}
                color="orange"
            />
            <CardMedia
                component="img"
                height="194"
                image={product.Images!=""?`http://localhost:81/img/${product.Images.slice(0, 14)}`:"../../../images/camera2.webp"}
                alt={product.Address}
                onClick={() => { navigate("/detailsAttraction/" + product.Id+"/"+type) }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {(product.Description).slice(0,40)}...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.Address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {'₪'}{product.Price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Buttons id={product.Id} type={type}/>
            </CardActions>

        </Card>
    );
}
