import React from 'react'

const Modal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white p-4 rounded-md z-20">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>ID:</strong> {user._id}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;