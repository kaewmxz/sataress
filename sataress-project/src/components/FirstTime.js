import React from 'react'
import { useNavigate } from "react-router-dom";

const FirstTime = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/DASS21")
    }
  return (
    <div>
        FirstTime
    <button onClick={handleClick}></button>
    </div>
  )
}

export default FirstTime