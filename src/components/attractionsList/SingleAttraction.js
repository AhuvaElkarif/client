import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { useNavigate } from "react-router";
import "./SingleAttraction.css";
import Buttons from './Buttons';

export default function SingleAttraction({ product }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={product.CategoryName}
                subheader={product.Name}
            />
            <CardMedia
                component="img"
                height="194"
                image={`C:\\inetpub\\wwwroot\\image\\${product.Images.slice(0, 14)}`}
                alt={product.Address}
                onClick={() => { navigate("/detailsAttraction/" + product.Id) }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {product.Description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {'₪'}{product.Price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Buttons id={product.Id} />
            </CardActions>

        </Card>
    );
}
