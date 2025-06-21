import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosSecure.get("/blogs");
      let filteredBlogs = response.data;

      if (filter !== "all") {
        filteredBlogs = filteredBlogs.filter((blog) => blog.status === filter);
      }

      setBlogs(filteredBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/blogs/${id}/status`, {
        status: newStatus,
        requesterEmail: user?.email,
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog status:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/blogs/${id}`);
          fetchBlogs();

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The blog has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete the blog.",
          });
        }
      }
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center my-3">
        Content Management
      </h2>
      <div className="flex justify-between items-center mb-4">
        {/* blog filter by published or draft */}
        {/* give with select value */}
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        >
          <option value="all">All Blogs</option>
          <option value="published">Published Blogs</option>
          <option value="draft">Draft Blogs</option>
        </select>

        <Link to="/dashboard/content-management/add-blog">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Add Blog
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Thumbnail</th>
              <th className="text-left p-3">Content</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Update Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => (
              <tr key={blog._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{blog.title}</td>
                <td className="p-3">
                  <img
                    src={blog.thumbnail}
                    alt="thumb"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">
                  <div
                    className="line-clamp-2 max-w-xs"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.content.length > 30
                          ? blog.content.slice(0, 30) + "..."
                          : blog.content,
                    }}
                  />
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      blog.status === "published"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="p-3">
                  <select
                    value={blog.status}
                    onChange={(e) =>
                      handleStatusChange(blog._id, e.target.value)
                    }
                    className="border p-1 rounded-md"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </td>
                <td>
                  <div className="space-x-3">
                    <Link
                      to={`/dashboard/content-management/update-blog/${blog._id}`}
                    >
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;
