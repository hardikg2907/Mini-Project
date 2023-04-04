import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export const NavBar = () => {
    const {logout} = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <div className="navba">
            <Link to='/profile'>
                <h2>Profile</h2>
            </Link>
            <Link to='/permissions'>
                <h2>Permissions</h2>
            </Link>
            <button onClick={handleClick}>Log out</button>
        </div>
    )
}