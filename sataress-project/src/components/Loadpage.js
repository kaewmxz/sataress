import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from "@material-ui/core";

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' , mt:50}}>
       <Grid container justifyContent="center">
      <CircularProgress />
      </Grid>
    </Box>
  );
}