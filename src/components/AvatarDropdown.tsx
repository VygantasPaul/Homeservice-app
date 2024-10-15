import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvatarDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');

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
                    {user.token ? ( // Check if the user is logged in
                        <>
                            <li onClick={() => navigate('/booking')}>My Bookings</li>
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li onClick={() => navigate('/login')}>Login</li>
                        <li onClick={() => navigate('/register')}>Register</li>
                        </>

                        // Show login option if not logged in
            )}
        </ul>
    )
}
</div>
    );
};

export default AvatarDropdown;
