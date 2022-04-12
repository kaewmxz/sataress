import React from 'react';
import Dialog from "@mui/material/Dialog";

export default function PopupBox() {
    const [openInfo, setOpenInfo] = React.useState(false);

    const handleClickOpenInfo = () => {
        setOpenInfo(true);
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    };

    return (
        <div>
            <button onClick={() => handleClickOpenInfo()} style={{ cursor:"pointer",fontSize: 18, color: "#FE440A" , fontFamily:'Noto Sans,Kanit,sans-serif', border: "none", background:"none"}}>Play</button>
            <Dialog open={openInfo} onClose={handleCloseInfo}>
            <iframe width="330" height="230" src="https://www.youtube.com/embed/zbjzsRckIE8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Dialog>
        </div>
    );
}