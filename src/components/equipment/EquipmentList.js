import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { getEquipmentsByAttractionId } from '../../store/actions/EquipmentAction';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function EquipmentList({id}) {
    let [equipment, setEquipment] = useState([]);
    useEffect(() => {
        getEquipmentsByAttractionId(id)
            .then(x => setEquipment(x.data))
            .catch(err => console.log(err));
    }, [id])

    return (
    equipment != null ?<Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
                <Demo>
                    <List>
                            {equipment.map(item => <ListItem key={item.Id}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.Name}
                                />
                            </ListItem>)}
                    </List>
                </Demo>
            </Grid>

        </Box>:null
    );
}
