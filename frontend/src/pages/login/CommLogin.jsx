import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../context"


export const CommLogin = () => {
    
    // const {loggedIn,setLoggedIn} = useGlobalContext()
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    
    const submitForm = () => {
        
    }

    return <form className="form" action="http://localhost:3000/user/login" method="POST">
        <p className="form-title">Committee Login</p>
        <div className="input-container">
            <label htmlFor="username">Email</label>
            <input type="email" placeholder="Email" name="username" id="username" onChange={(e)=>{setEmail(e.currentTarget.value)}} autoComplete="off"/>
        </div>
        <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" id="password" onChange={(e)=>{setPass(e.currentTarget.value)}}/>
        </div>

        <button type="submit" className="submit">Submit</button>

    </form>
}