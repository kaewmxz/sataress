import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const theme = createTheme({
    palette: {
        Addbutton: {
            main: "#ef9a9a",
            contrastText: "#ffff",
        },
        secondary: {
            main: "#ef9a9a",
        },
        Black: {
            main: "#212121",
        },
    },
});
export default function PopupInformation() {
    const [openInfo, setOpenInfo] = React.useState(false);

    const handleClickOpenInfo = () => {
        setOpenInfo(true);
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <IconButton size="small"
                sx = {{marginTop:-5.5,marginLeft:25}}>
                    <InfoIcon fontSize="inherit" sx={{ fontSize: "16px", color: "Black" }} onClick={handleClickOpenInfo} />
                </IconButton>
                <Dialog
                    open={openInfo}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseInfo}
                >
                    <DialogTitle sx = {{width:"260px"}}
                    color="secondary">{"ในระยะ 1 สัปดาห์ที่ผ่านมาเธอมีประสบการณ์เหล่านี้เกิดขึ้นมั้ย?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                          0 : ไม่มี <br/>
                          1 : เกิดขึ่้นกับเธอบ้างบางเวลา<br/>
                          2 : เกิดขึ้นกับเธอบ่อยๆ<br/>
                          3 : เกิดขึ้นกับเธอเกือบทุกครั้ง
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                         variant="contained" 
                         color="Addbutton"
                         onClick={handleCloseInfo}
                  sx={{ margin:1 }}>
                  ปิด
                </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
}