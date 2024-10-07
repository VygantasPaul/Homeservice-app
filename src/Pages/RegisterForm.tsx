import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    email: string;
    token: string;
}

interface RegisterFormProps {
    setUser: (user: User) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setUser }) => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Clear previous error
        setSuccessMessage(null); // Clear previous success message

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post<User>('http://localhost:5600/api/user/register', {
                username,
                email,
                password
            });
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));

            // Set the success message
            setSuccessMessage("Registration successful! Redirecting to login page...");

            // Delay navigation to let the user see the success message
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
