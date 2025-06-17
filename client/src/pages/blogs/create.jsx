import axios from "axios";
import React, { useState } from "react";
import Footer from "../../utils/footer";

function CreateBlog() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    image: "", // New image field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { title, author, content, image } = form;
    const response =await axios.post("/api/create/blog", {
      title,
      author,
      content,
      image
    });
    if(response.status === 201) {
      console.log("Blog created successfully");
    }
    else {
      console.error("Error creating blog");
    }
    if (title && author && content) {
      setBlogs([{ ...form }, ...blogs]);
      setForm({ title: "", author: "", content: "", image: "" });
    }
  };

  return (
    <>
    <div className="container mt-5">
      <h2 className="text-center mb-4">🩺 Create a Vet Blog Post</h2>

      <form className="border p-4 shadow rounded mb-5 bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Blog Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="4"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL (optional)</label>
          <input
            type="url"
            className="form-control"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="btn btn-primary">Post Blog</button>
      </form>

      <div>
        <h3 className="mb-3">🐾 Recent Blog Posts</h3>
        {blogs.length === 0 ? (
          <p>No blogs posted yet.</p>
        ) : (
          blogs.map((blog, index) => (
            <div key={index} className="card mb-3 shadow-sm">
              {blog.image && (
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt="Blog visual"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">by {blog.author}</h6>
                <p className="card-text">{blog.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer/>
</>
  );
}

export default CreateBlog;
