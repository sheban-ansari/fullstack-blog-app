import { useEffect, useState } from "react";

// API URL from environment variable
const API = import.meta.env.VITE_API_URL;

function App() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to fetch posts. Please try again.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      }
      setTitle("");
      setContent("");
      setEditingId(null);
      setShowModal(false);
      fetchPosts();
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post._id);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* NAVBAR  */}
      <nav className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-5 flex justify-between items-center z-50">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          🚀 Blog App
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setTitle("");
            setContent("");
          }}
          className="bg-white text-blue-600 px-5 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition transform font-semibold"
        >
          + Create Post
        </button>
      </nav>

      {/* BLOG LIST */}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Latest Blogs</h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-lg">No posts available</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 border-t-4 border-blue-500"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>

                <div className="flex gap-3 mt-4">
                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105 transition transform shadow-sm hover:shadow-md font-medium"
                  >
                    ✏️ Edit
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 transition transform shadow-sm hover:shadow-md font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl animate-fadeIn scale-100 transition transform relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingId ? "Edit Post" : "Create Post"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Enter content"
                className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:shadow-xl hover:scale-105 transition transform font-semibold"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;