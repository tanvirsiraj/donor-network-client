import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const {user}= useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosSecure.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/blogs/${id}/status`, {
        status: newStatus,
        requesterEmail: user?.email, 
      });
      fetchBlogs(); // Refresh data
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Content Management</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Add Blog</button>
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
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => (
              <tr key={blog._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{blog.title}</td>
                <td className="p-3">
                  <img src={blog.thumbnail} alt="thumb" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3">
                  {blog.content.length > 20 ? `${blog.content.slice(0, 20)}...` : blog.content}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-white text-sm ${blog.status === 'published' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                    {blog.status}
                  </span>
                </td>
                <td className="p-3">
                  <select
                    value={blog.status}
                    onChange={(e) => handleStatusChange(blog._id, e.target.value)}
                    className="border p-1 rounded-md"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
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
