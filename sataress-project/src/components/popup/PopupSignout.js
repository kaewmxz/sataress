import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, getAuth } from 'firebase/auth';


export default function PopupSignout() {
  const [open, setOpen] = React.useState(false);
  const auth = getAuth();
  const signOutHandle = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      window.location.replace("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      Yesbutton: {
        main: '#ef9a9a',
        contrastText: '#ffff',
      },
      Nobutton: {
        main: '#B9B9B9',
        contrastText: '#ffff',
      },
    secondary: {
      main: '#ef9a9a',
    },
  },
});

return (
  <div>
     <IconButton size="small">
            <LogoutIcon fontSize="inherit" onClick={handleClickOpen}/>
          </IconButton>
    <Dialog
      open={open}
      onClose={handleClose}>
      <ThemeProvider theme={theme}>
        <DialogTitle color="secondary" fontFamily='Noto Sans,Kanit,sans-serif'>
          ต้องการออกจากระบบหรือไม่
        </DialogTitle>
      </ThemeProvider>
      <DialogActions>
        <ThemeProvider theme={theme}>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            p: 1,
         }}>
        <Stack spacing = {1} mr = {6} >
            <Button onClick={signOutHandle} variant="contained" color="Yesbutton"
            sx ={{marginTop:-2}}
            style = {{minWidth:'150px', fontFamily:'Noto Sans,Kanit,sans-serif'}}>ใช่</Button>
            <Button onClick={handleClose} variant="contained" color="Nobutton" style = {{fontFamily:'Noto Sans,Kanit,sans-serif'}}>ไม่</Button>
          </Stack>
        </Box>
        </ThemeProvider>
      </DialogActions>
    </Dialog>

  </div>
);
}