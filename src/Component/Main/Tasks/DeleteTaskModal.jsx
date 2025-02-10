import React from "react";
import axios from "axios";

const DeleteTaskModal = ({ task, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://taskmanager-server-db69.onrender.com/tasks/${task._id}`);
      onDelete();  // Remove the task from UI
      onClose();   // Close the modal
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete the task.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Confirm Delete</h2>
        <p className="text-gray-500 mb-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
