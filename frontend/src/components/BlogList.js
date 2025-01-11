import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogList.css';

function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:3000/blogs', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setBlogs(res.data);
            } catch (err) {
                console.error('Error fetching blogs', err);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="blog-list">
            <h2>Blog Posts</h2>
            {blogs.map(blog => (
                <div key={blog._id} className="blog-item">
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                   
                </div>
            ))}
        </div>
    );
}

export default BlogList;
