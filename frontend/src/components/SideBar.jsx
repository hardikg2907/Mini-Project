import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useState } from 'react'
import {CgProfile} from 'react-icons/cg'
import {RiCalendarCheckFill, RiDraftLine} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'

export const SideBar = () => {
    const {logout} = useLogout()
    
    const handleClick = () => {
        logout()
    }

    const [sideOpen, setSideOpen]=useState(false);
    const handleChange=(e)=>{
        setSideOpen(e.target.checked);
    }

    return (
        <div>
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
                    <input type="checkbox" id="hamMenu" onChange={handleChange}/>
                    
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        {/* <h3>CampusConnect</h3> */}
                        <li>
                            <Link to='/profile'>
                                <CgProfile size='1.8em'/><h2>Profile</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to='/events'>
                                <RiCalendarCheckFill size='1.8em'/><h2>All Events</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to='/permissions'>
                                <RiDraftLine size='1.8em'/><h2>Permissions</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleClick} className='logOutBtn'>
                                <FiLogOut size='1.8em'/>
                                <h2>Log out</h2>
                            </Link>
                        </li>
                    </ul>
                </div>
                </nav>
                <div className='closed-menu'>
                    <ul id="closedLogo">
                        <li>
                            <Link to='/profile'>
                                <CgProfile size='1.8em'/><h2></h2>
                            </Link>
                        </li>
                        <li>
                            <Link to='/events'>
                                <RiCalendarCheckFill size='1.8em'/><h2></h2>
                            </Link>
                        </li>
                        <li>
                            <Link to='/permissions'>
                                <RiDraftLine size='1.8em'/><h2></h2>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleClick} className='logOutBtn'>
                                <FiLogOut size='1.8em'/><h2></h2>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {sideOpen && 
                <div id="sideFill">
                    <label for="hamMenu"></label>
                </div>
            }
        </div>
    )
}