import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const blogImage = form.blogImage.files[0];

    const formData = new FormData();
    formData.append("image", blogImage);

    try {
      const res = await axiosSecure.post(image_hosting_api, formData);
      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        const blogData = {
          title,
          content,
          thumbnail: imageUrl,
          author: user?.displayName || "Anonymous",
          date: new Date().toISOString(),
          status: "draft", // default status
        };

        const response = await axiosSecure.post("/blogs", blogData);

        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Blog posted successfully!",
            timer: 1500,
            showConfirmButton: false,
          });
          form.reset();
          setContent("");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to post blog",
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Add New Blog</h1>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title</label>
          <input name="title" required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Blog Image</label>
          <input type="file" name="blogImage" accept="image/*" required className="w-full px-3 py-2 border rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
