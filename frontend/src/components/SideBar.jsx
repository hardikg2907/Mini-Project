import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export const SideBar = () => {
    const {logout} = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <div className="navbar">
            {/* <Link to='/profile'>
                <h2>Profile</h2>
            </Link>
            <Link to='/permissions'>
                <h2>Permissions</h2>
            </Link>
            <button onClick={handleClick}>Log out</button> */}

            <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />

                <span></span>
                <span></span>
                <span></span>
    
                <ul id="menu">
                    <li>
                        <Link to='/profile'>
                            <h2>Profile</h2>
                        </Link>
                    </li>
                    <li>
                        <Link to='/permissions'>
                            <h2>Permissions</h2>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleClick}>Log out</button>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}