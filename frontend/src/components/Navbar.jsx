import React from "react";

const Navbar = ({ onCreate }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Blog App 🚀
        </h1>
        <button
          onClick={onCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Post
        </button>
      </div>
    </nav>
  );
};

export default Navbar;