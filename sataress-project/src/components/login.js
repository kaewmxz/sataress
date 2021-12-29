import React from 'react'
import './login.css';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, createTheme } from '@material-ui/core'

const Login=()=>{
    const backgroundColor = {position: relative,
        width: 375 px,
        height: 683 px,
        
        background: #FFFFFF,
        position: absolute,
        width: max-content,
        height: max-content,
        left: 0 px,
        top: 0 px,
        
        background: linear-gradient(180deg, rgba(255, 189, 189, 0.3) 0%, rgba(254, 68, 10, 0.3) 44.27%),
        backdrop-filter: blur(4px)
    }
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                </Grid>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            </Paper>
        </Grid>
    )
}

export default Login