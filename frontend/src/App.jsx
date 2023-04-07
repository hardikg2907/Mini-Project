import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Home } from './pages/Home'
import './App.css'
// import { NavBar } from './components/NavBar'
import { Profile } from './pages/profile/Profile'
import { SideBar } from './components/SideBar'
import {Permission} from './pages/permissions/Permission'
import { useAuthContext } from './context/AuthContext'
import { PermissionForm } from './pages/permissions/PermissionForm'

export default function App() {

    const {user} = useAuthContext();

    return (
        <main className="container">
            <BrowserRouter>
                    {user && <SideBar/>}
                <Routes>
                    <Route path="/" element={!user?<Home/>:<Navigate to='/permissions'/>}/>
                    <Route path='/profile' element={user?<Profile/>:<Navigate to='/'/>}/>
                    <Route path='/permissions' element={user?<Permission/>:<Navigate to='/'/>}/>
                    <Route path='/permissions/form' element={user?<PermissionForm/>:<Navigate to='/'/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}