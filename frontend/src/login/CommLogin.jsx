import { useState } from "react"

const submitForm = () => {

}

export const CommLogin = () => {

    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');


    return <form className="form" onSubmit={(e)=>{
        e.preventDefault();
        submitForm()}}>
        <p className="form-title">Committee Login</p>
        <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" name="email" id="email" onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
        </div>
        <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" id="password" onChange={(e)=>{setPass(e.currentTarget.value)}}/>
        </div>

        <button type="submit" className="btn submit">Submit</button>

    </form>
}