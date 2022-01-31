import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from "../services/firebase";
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
        main: '#e57373',
        contrastText: '#ffebee',
      },
      Nobutton: {
        main: '#f8bbd0',
        contrastText: '#757575',
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
        <DialogTitle mt={2} color="secondary">
          {"ต้องการออกจากระบบหรือไม่"}
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
            m: 1,
         }}>
        <Stack spacing = {2} >
            <Button onClick={signOutHandle} variant="contained" color="Yesbutton">ใช่</Button>
            <Button onClick={handleClose} variant="contained" color="Nobutton">ไม่</Button>
          </Stack>
        </Box>
        </ThemeProvider>
      </DialogActions>
    </Dialog>

  </div>
);
}