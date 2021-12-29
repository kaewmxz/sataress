import React from 'react'
import { signIn } from '../services/firebase'
import GoogleButton from 'react-google-button'

function Login() {
    return (
        <div>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <GoogleButton onClick={signIn}>
                Sign in with Google
            </GoogleButton>
        </div>
    )
}

export default Login