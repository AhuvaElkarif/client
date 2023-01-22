import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Poppers from "../popper/Popper";
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export default function SingleCategory({ add, item, categoryDeleted, setImg }) {
    const [name, setName] = React.useState("");

    const handleChange = (e) => {
        const FileName = e.target.files[0].name;
        setName(FileName);
        setImg(e.target.files[0]);
    }

    return <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography variant="h5" component="div">
                {item.Name}
            </Typography>
            <Typography variant="body">
                <IconButton aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleChange} />
                    <AddIcon /> הוסף תמונה
                </IconButton>
            </Typography>

            <Typography variant="body2" component="div">
                {name}
            </Typography>

        </CardContent>

        <CardActions>
            <Poppers
                type={3}
                content={"אשר"}
                func={() => { add(item) }}
                text="אשר את הקטגוריה" />
            <Poppers
                type={1}
                content={<DeleteIcon style={{ color: "orange" }} />}
                func={() => { categoryDeleted(item) }}
                text="מחוק את הקטגוריה" />
        </CardActions>
        
    </Card>
}