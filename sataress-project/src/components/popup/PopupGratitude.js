import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { AuthContext } from '../Auth';



export default function PopupGratitude() {
  const [open, setOpen] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    const data = { 
      gratitude: e.target[0].value,
      id: currentUser.uid    
    };
    try {
      await axios.post("http://localhost:4000/gratitude", data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const theme = createTheme({
    palette: {
      Addbutton: {
        main: '#bdbdbd',
        contrastText: '#ffcdd2',
      },
    secondary: {
      main: '#ef9a9a',
    },
  },
});
return (
  <div>
    <Button onClick={handleClickOpen}>
      <img src="/image/gratitude.png"
        width="243px"
        height="31px" />
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}>
      <ThemeProvider theme={theme}>
        <DialogTitle mt={2} color="secondary">
          {"คุณรู้สึกขอบคุณกับสิ่งใดในวันนี้"}
        </DialogTitle>
      </ThemeProvider>
      <form onSubmit={handleSubmit}>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { width: '32ch' },
          }}
          mt={2}>
          <TextField required>
            <input type="text"></input>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <ThemeProvider theme={theme}>
          <Stack mt={2} spacing={2}>
            <Button type="submit" variant="contained" color="Addbutton">บันทึก</Button>
          </Stack>
        </ThemeProvider>
      </DialogActions>
      </form>
    </Dialog>
  </div>
);
}