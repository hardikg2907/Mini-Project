import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CommLogin } from './login/CommLogin'
import './App.css'

export default function App() {


    return (
        <main className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<CommLogin/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}