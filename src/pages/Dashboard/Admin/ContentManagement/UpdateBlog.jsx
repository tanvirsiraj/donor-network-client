import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateBlog = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const editor = useRef(null);
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosSecure.get(`/blogs/${id}`);
        console.log("Fetched blog:", res.data);
        setBlog(res.data);
        setContent(res.data.content);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const blogImage = form.blogImage.files[0];

    let imageUrl = blog?.thumbnail;

    try {
      if (blogImage) {
        const formData = new FormData();
        formData.append("image", blogImage);
        const res = await axiosSecure.post(image_hosting_api, formData);
        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const updatedBlog = {
        title,
        content,
        thumbnail: imageUrl,
      };

      const response = await axiosSecure.patch(`/blogs/${id}`, updatedBlog);

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Blog updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard/content-management");
      }
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update blog",
      });
    }
  };

  //   if (!blog) {
  //     return <p className="text-center mt-10">Loading blog...</p>;
  //   }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Update Blog</h1>
      <form
        onSubmit={handleUpdate}
        className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block  font-bold mb-2">Title</label>
          <input
            name="title"
            defaultValue={blog?.title}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block  font-bold mb-2">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <div className="mb-4">
          <label className="block  font-bold mb-2">Thumbnail</label>
          <img
            src={blog?.thumbnail}
            alt="Current Thumbnail"
            className="w-32 h-32 object-cover mb-2"
          />
          <input
            type="file"
            name="blogImage"
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave blank to keep current image.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 font-semibold rounded"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
