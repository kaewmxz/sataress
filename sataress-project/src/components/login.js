import React from 'react'
import { signIn } from '../services/firebase'
import GoogleButton from 'react-google-button'
import {useTheme} from "@material-ui/core/styles"
import styled from "styled-components"
import {withTheme} from "@material-ui/core/styles"
import "./Login.css"

const Bg = withTheme(styled.div`
position: absolute;
background: #FFFFFF;
width: 100vw;
height: 100vh;
background: linear-gradient(180deg, rgba(255, 189, 189, 0.3) 0%, rgba(254, 68, 10, 0.3) 44.27%);
backdrop-filter: blur(4px);
    `);

const Login = () => {
const theme = useTheme();
    return (
        <Bg>
            <center>
        <div className='GoogleButton'>
            <GoogleButton onClick={signIn}>
                Sign in with Google
            </GoogleButton>
        </div>
        </center>
        </Bg>
    )
}
export default Login