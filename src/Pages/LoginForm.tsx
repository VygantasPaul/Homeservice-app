import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    email: string;
    token: string;
}

interface LoginFormProps {
    setUser: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUser }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Error state
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccessMessage(null); // Reset success message state
        setLoading(true); // Set loading to true

        try {
            const response = await axios.post<User>('http://localhost:5600/api/user/login', { email, password });
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setSuccessMessage('Login successful!'); // Set success message
            setTimeout(() => navigate('/booking'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setError('Invalid email or password.'); // Set error message
            console.error('Login error:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleLogin}>
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
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
        </form>
    );
};

export default LoginForm;
