import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvatarDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <img
                src="/avatar.png"
                alt="User Avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
                <ul>
                    <li onClick={() => navigate('/my-bookings')}>My Bookings</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            )}
        </div>
    );
};

export default AvatarDropdown;
