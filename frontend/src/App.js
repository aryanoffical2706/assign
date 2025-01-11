import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import BlogList from './components/BlogList';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Header user={user} />
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/blogs" /> : <Login setUser={setUser} />} />
                    <Route path="/signup" element={user ? <Navigate to="/blogs" /> : <Signup />} />
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
