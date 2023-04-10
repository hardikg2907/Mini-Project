import React, {useState} from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import { signInWithGoogle } from "../Firebase"

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('Committee')
    const navigate = useNavigate();
    const {login, isLoading, error} = useLogin()

    const handleGoogleAuth = async (e) => {
        e.preventDefault()
    }
    
    const submitForm = async (e) => {
        e.preventDefault();

        if(await login(email,password,type)) {
            navigate('/permissions')
        }
    }
    
    // const [color, changeColor]=useState["#3DA6FC"];

    return (
        <form className="form" onSubmit={submitForm}>
            <p className="form-title">Login</p>
            <div className="input-container">
                <label htmlFor="username">Email</label>
                <input type="email" placeholder="aditya@gmail.com" name="username" id="username" onChange={(e)=>{setEmail(e.currentTarget.value)}} value={email} />
            </div>
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="***" name="password" id="password" onChange={(e)=>{setPassword(e.currentTarget.value)}} value={password}/>
            </div>
            <div className="forgotDiv">
                <a className="forgot">Forgot Password?</a>
                <div className='error'>{error}</div>
            </div>

            <div className="submit-box">
                <div><button type="submit" className="submit" disabled={isLoading}>Log in</button></div>
                <div style={{display: "flex", color:"#DCD8D8"}}>
                    <hr style={{border: "1px solid #DCD8D8", width: "125px", borderRadius: "3px", backgroundColor:"#DCD8D8", height: "2px"}}/>
                    or
                    <hr style={{border: "1px solid #DCD8D8", width: "125px", borderRadius: "3px", backgroundColor:"#DCD8D8", height: "2px"}}/>
                </div>
            </div>
            <div className="submit-box">
                <button className="submit google" disabled={isLoading} onClick={signInWithGoogle}><i className="fa-brands fa-google fa-xl"></i>   Log in with Google</button>
            </div>
            <div className="userType">
                <btn className={type=='Committee'?'committee yellow':'committee'} onClick={()=>{setType('Committee')}}>Committee</btn>
                <btn className={type=='Faculty'?'faculty yellow':'faculty'} onClick={()=>{setType('Faculty')}}>Faculty</btn>
            </div>

        </form>
    )
}

export default Login