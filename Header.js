import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';

const Header = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:3001/api/newsletter/signup', { email });
            setMessage(response.data.message);
            setEmail('');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="newsletter-header">
            <h1>Subscribe to Our Newsletter</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </header>
    );
}

export default Header;