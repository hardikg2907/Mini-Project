import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"


export const CommLogin = () => {
    
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login, isLoading, error} = useLogin()
    
    const submitForm = async (e) => {
        e.preventDefault();

        await login(email,password)

        navigate('/permissions')
    }

    return <form className="form" onSubmit={submitForm}>
        <p className="form-title">Committee Login</p>
        <div className="input-container">
            <label htmlFor="username">Email</label>
            <input type="email" placeholder="Email" name="username" id="username" onChange={(e)=>{setEmail(e.currentTarget.value)}} value={email} />
        </div>
        <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" id="password" onChange={(e)=>{setPassword(e.currentTarget.value)}} value={password}/>
        </div>

        <button type="submit" className="submit" disabled={isLoading}>Log in</button>
        {error && <div className='error'>{error}</div>}

        {/* <button type="submit" className="submit">Submit</button> */}

    </form>
}