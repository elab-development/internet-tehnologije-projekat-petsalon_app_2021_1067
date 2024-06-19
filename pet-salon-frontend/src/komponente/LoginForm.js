import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
const LoginForm = () => {
    const [email, setEmail] = useState('drolfson@example.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            const { access_token, token_type, user } = response.data;

            // Save the token and user information in session storage
            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('token_type', token_type);
          

            // Optionally, redirect the user or do something else
            console.log('Login successful');
        } catch (error) {
            setError('Nisu dobri parametri za login.');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Lozinka:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
