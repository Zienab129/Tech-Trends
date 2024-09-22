import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', body: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/posts/${id}`)
        .then(response => setPost(response.data))
        .catch(error => console.error('There was an error fetching the post!', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/posts/${id}`, post)
        .then(() => navigate('/'))
        .catch(error => console.error('There was an error updating the post!', error));
    } else {
      axios.post('http://localhost:5000/posts', post)
        .then(() => navigate('/'))
        .catch(error => console.error('There was an error creating the post!', error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Post' : 'New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
}

export default EditPost;
