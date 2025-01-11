import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('https://assignment-vd7a.onrender.com/blogs', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setBlogs(res.data);
        } catch (err) {
            alert('Error fetching blogs');
        }
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (selectedBlogId) {
                // Update blog post
                await axios.put(`https://assignment-vd7a.onrender.com/blogs/${selectedBlogId}`, { title, content }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Blog updated');
            } else {
                // Create new blog post
                await axios.post('https://assignment-vd7a.onrender.com/blogs', { title, content }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Blog created');
            }
            fetchBlogs();
            setTitle('');
            setContent('');
            setSelectedBlogId(null);
        } catch (err) {
            alert('Error creating or updating blog');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://assignment-vd7a.onrender.com/blogs/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Blog deleted');
            fetchBlogs();
        } catch (err) {
            alert('Error deleting blog');
        }
    };

    const handleEdit = (blog) => {
        setSelectedBlogId(blog._id);
        setTitle(blog.title);
        setContent(blog.content);
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleCreateOrUpdate}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                <button type="submit">{selectedBlogId ? 'Update Blog' : 'Create Blog'}</button>
            </form>
            <div className="blog-list">
                <h3>Existing Blogs</h3>
                {blogs.map(blog => (
                    <div key={blog._id} className="blog-item">
                        <h4>{blog.title}</h4>
                        <p>{blog.content}</p>
                        
                        <button style={{ margin:"10px"}} onClick={() => handleEdit(blog)}>Edit</button>
                        <button onClick={() => handleDelete(blog._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
