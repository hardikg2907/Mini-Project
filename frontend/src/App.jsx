import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CommLogin } from './pages/login/CommLogin'
import './App.css'
// import { NavBar } from './components/NavBar'
import { Profile } from './pages/profile/Profile'
import { NavBar } from './components/NavBar'
import {Permission} from './pages/permissions/Permission'

export default function App() {

    return (
        <main className="container">
                    <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<CommLogin/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/permissions' element={<Permission/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}