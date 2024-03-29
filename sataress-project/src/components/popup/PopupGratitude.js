import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { AuthContext } from "../Auth";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    Addbutton: {
      main: "#ef9a9a",
      contrastText: "#ffff",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Noto Sans,Kanit,sans-serif",
    },
  },
  components: {
    // Name of the component
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Noto Sans,Kanit,sans-serif",
        },
      },
    },
  },
});

export default function PopupGratitude() {
  const [open, setOpen] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (e) => {
    try {
      if (e.target[0].value.length != 0) {
        const date = new Date();
        let time =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let day =
          date.getDate().toString() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear().toString();
        if (date.getHours() < 10) {
          time =
            "0" +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
        }
        if (date.getMinutes() < 10) {
          time =
            date.getHours() +
            ":0" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
        }
        if (date.getSeconds() < 10) {
          time =
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":0" +
            date.getSeconds();
        }
        let dateTime = day + " " + time;
        const data = {
          gratitude: e.target[0].value,
          date: dateTime,
          dateToCheck: date,
          id: currentUser.uid,
        };
        try {
          await axios
            .post("https://backend-glint.herokuapp.com/gratitude-result", data)
            .then((res) => {
              setTimeout(() => {}, 100);
              // setOpen(false);
              window.location = "/Home"; //This line of code will redirect you once the submission is succeed
            });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      setOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <img
          src="/image/graj.avif"
          width="320.7px"
          height="183px"
          onClick={handleClickOpen}
          style={{ cursor: "pointer" }}
        />
        <Dialog
          open={open}
          onClose={(e) => {
            handleClose(e);
          }}
        >
          <DialogContent
            mt={2}
            sx={{ textAlign: "center", color: "#ef9a9a", fontSize: "1.3rem" }}
          >
            <Typography variant="h7">
              คุณรู้สึกขอบคุณกับสิ่งใดในวันนี้
            </Typography>
          </DialogContent>
          <DialogContent sx={{ mt: "-20px", mb: "-20px", fontSize: "0.9rem" }}>
            <Typography variant="h7" color="text.secondary">
              "ความรู้สึกขอบคุณ คือ
              ความรู้สึกที่ขอบคุณหรือยินดีกับประสบการณ์ที่เกิดขึ้นในชีวิต
              <br />
              สิ่งที่ขอบคุณอาจจะเป็นเรื่องราวอะไรก็ได้ที่เกิดขึ้นในวันนี้
              ที่เรารู้สึกขอบคุณหรือยินดี
              อาจจะเป็นเรื่องร้ายหรือเรื่องดีที่เราผ่านมันมาได้"
            </Typography>
          </DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose(e);
            }}
          >
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiTextField-root": { width: "auto" },
                }}
              >
                <TextField required>
                  <input type="text"></input>
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Stack mt={1} mb={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="Addbutton"
                  sx={{ marginTop: -2 }}
                >
                  บันทึก
                </Button>
              </Stack>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
