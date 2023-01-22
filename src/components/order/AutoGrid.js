import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function AutoGrid({ item1 , item2 , item3 }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {item1}
        </Grid>

        <Grid item>
          {item2}
        </Grid>

        <Grid item xs>
          {item3}
        </Grid>
      </Grid>
    </Box>
  );
}
