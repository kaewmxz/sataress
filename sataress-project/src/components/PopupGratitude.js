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



export default function PopupGratitude() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { width: '32ch' },
          }}
          mt={2}>
          <TextField />
        </Box>
      </DialogContent>
      <DialogActions>
        <ThemeProvider theme={theme}>
          <Stack mt={2} spacing={2}>
            <Button onClick={handleClose} variant="contained" color="Addbutton">บันทึก</Button>
          </Stack>
        </ThemeProvider>
      </DialogActions>
    </Dialog>

  </div>
);
}