import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ user }) {
    const location = useLocation();
    const pageName = location.pathname.substring(1).toUpperCase() || 'LOGIN';

    return (
        <header className="header">
            <h1>{pageName}</h1>
            <nav>
                <Link to="/blogs">Blogs</Link>
                {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
                {user ? (
                    <button onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
