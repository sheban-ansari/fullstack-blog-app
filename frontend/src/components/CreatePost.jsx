import React, { useState } from "react";
import API from "../services/api";

const CreatePost = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/posts", { title, content });
      alert("Post Created Successfully 🚀");
      onClose();
      window.location.reload(); // refresh to show new post
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create New Blog ✍️
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter blog title"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your content..."
            rows="4"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;