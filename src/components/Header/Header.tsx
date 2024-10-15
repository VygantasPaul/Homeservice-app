import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Header.css';
import AvatarDropdown from "../AvatarDropdown"; // Add your CSS styles here

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">MyApp</Link>
            </div>
            <nav>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" end className={({isActive}) => (isActive ? 'active' : '')}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/business" className={({isActive}) => (isActive ? 'active' : '')}>
                            Businesses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/booking" className={({isActive}) => (isActive ? 'active' : '')}>
                            My Booking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/categories" className={({isActive}) => (isActive ? 'active' : '')}>
                            Categories
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({isActive}) => (isActive ? 'active' : '')}>
                            About
                        </NavLink>
                    </li>

                    <li>
                        <AvatarDropdown/>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
