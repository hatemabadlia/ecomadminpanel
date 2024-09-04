    // src/pages/Login.js
    import React, { useState } from 'react';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { useNavigate } from 'react-router-dom';
    import { auth } from '../services/firebaseconfig';

    const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
        } catch (error) {
        setError('Failed to log in. Please check your credentials and try again.');
        console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
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
            <button type="submit">Login</button>
        </form>
        </div>
    );
    };

    export default Login;
