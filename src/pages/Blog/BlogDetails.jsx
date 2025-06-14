import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';
import useAuth from '../../hooks/useAuth';

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axiosSecure.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, axiosSecure]);

  if (loading) return <Loading />;

  if (!blog) {
    return (
      <div className="text-center text-gray-500 my-20">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 mt-12">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>

      <div className="text-sm text-gray-500 mb-6 flex justify-between">
        <p>
          Author: <span className="text-gray-700 font-medium">{user?.displayName}</span>
        </p>
        <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>

      <div
        className="prose prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetails;
