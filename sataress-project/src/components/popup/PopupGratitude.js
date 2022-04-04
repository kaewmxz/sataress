import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { AuthContext } from "../Auth";

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
    const date = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let day = date.getDate().toString() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear().toString();
    if (date.getMinutes() < 10) {
      time = date.getHours() + ':0' + date.getMinutes() + ":" + date.getSeconds();
    }
    let dateTime = day + " " + time;
    const data = {
      gratitude: e.target[0].value,
      date: dateTime,
      dateToCheck: date,
      id: currentUser.uid,
    };
    console.log(e.target[0].value);
    try {
      await axios.post("http://localhost:4000/gratitude-result", data);
    } catch (error) {
      console.log(error);
    }
  };

  const theme = createTheme({
    palette: {
      Addbutton: {
        main: "#ef9a9a",
        contrastText: "#ffff",
      },
      secondary: {
        main: "#ef9a9a",
      },
    },
  });
  return (
    <div>
        <img
          src="/image/graj.png"
          width="320.7px"
          height="183px"
          onClick={handleClickOpen}
          style={{cursor:"pointer"}}
        />
      <Dialog open={open} onClose={handleClose}>
        <ThemeProvider theme={theme}>
          <DialogTitle mt={2} color="secondary">
            {"คุณรู้สึกขอบคุณกับสิ่งใดในวันนี้"}
          </DialogTitle>
        </ThemeProvider>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& .MuiTextField-root": { width: "32ch" },
              }}
            >
              <TextField required>
                <input type="text"></input>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <ThemeProvider theme={theme}>
              <Stack mt={1} mb={1} >
                <Button type="submit" variant="contained" color="Addbutton"
                  sx={{ marginRight: 13, marginTop: -2 }}>
                  บันทึก
                </Button>
              </Stack>
            </ThemeProvider>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
