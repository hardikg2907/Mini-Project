import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { CommLogin } from './pages/login/CommLogin'
import './App.css'
// import { NavBar } from './components/NavBar'
import { Profile } from './pages/profile/Profile'
import { NavBar } from './components/NavBar'
import {Permission} from './pages/permissions/Permission'
import { useAuthContext } from './context/AuthContext'

export default function App() {

    const {user} = useAuthContext()

    return (
        <main className="container">
            <BrowserRouter>
                    {user && <NavBar/>}
                <Routes>
                    <Route path="/" element={!user?<CommLogin/>:<Navigate to='/permissions'/>}/>
                    <Route path='/profile' element={user?<Profile/>:<Navigate to='/'/>}/>
                    <Route path='/permissions' element={user?<Permission/>:<Navigate to='/'/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}