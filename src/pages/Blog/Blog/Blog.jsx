import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";

const Blog = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await axiosSecure.get("/blogs");
        const publishedBlogs = response.data.filter(
          (blog) => blog.status === "published"
        );
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedBlogs();
  }, []);

  return (
    <div className=" my-20 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Latest Blogs</h2>

      {loading ? (
        <Loading />
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No published blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full  h-60 object-contain "
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <div
                  className="text-gray-600 mb-4 "
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content.length > 80
                        ? blog.content.slice(0, 80) + "..."
                        : blog.content,
                  }}
                ></div>

                <div className="flex justify-between text-md text-gray-500">
                  <p>
                    By{" "}
                    <span className="font-bold text-black">
                      {"Tanvir Hasan"}
                    </span>
                  </p>
                  <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
                <Link
                  to={`/blog/${blog._id}`}
                  className="mt-4 flex items-center justify-center"
                >
                  <button className="bg-primaryColor text-center text-white hover:bg-primaryColor hover:text-white text-sm font-semibold px-2 py-1 rounded">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
