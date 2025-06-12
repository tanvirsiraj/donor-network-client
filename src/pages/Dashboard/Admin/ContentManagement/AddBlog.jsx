import React from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
  const imageFile = { image: data?.blogImage };

  try {
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const imageUrl = res.data.data.display_url;

      const blogData = {
        title: data.title,
        content: data.content,
        image: imageUrl,
        author: user?.displayName,
        date: new Date().toISOString(),
      };

      // Example: Post blog data to your backend
      const response = await axiosSecure.post("/blogs", blogData);

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Blog posted successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        // Optionally reset the form or navigate
      }
    }
  } catch (error) {
    console.error("Error uploading blog image or saving blog:", error);
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
            <textarea id="content" name="content" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"></textarea>
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blogImage">Blog Image</label>
            <input type="file" id="blogImage" name="blogImage" accept="image/*" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Post Blog</button>
        </form>
    </div>
  )
}

export default AddBlog