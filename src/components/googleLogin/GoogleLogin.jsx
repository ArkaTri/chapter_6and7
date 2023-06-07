import { useGoogleLogin } from '@react-oauth/google'
import React from 'react'
import { Button } from 'react-bootstrap'
import { googleLogin } from '../../redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const GoogleLogin = ({buttonText}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            const data = {
                access_token: tokenResponse.access_token,
            }
            dispatch(googleLogin(data, navigate))
        }
    })

  return (
    <Button variant='primary' onClick={() => login()}>
        {buttonText}
    </Button>
   )
}
 
export default GoogleLogin