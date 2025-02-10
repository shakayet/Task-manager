import React, { useState } from "react";
import axios from "axios";

const EditTaskModal = ({ task, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the PUT request to update the task
    axios
      .put(`https://taskmanager-server-db69.onrender.com/${task._id}`, updatedTask)
      .then((response) => {
        console.log("Task updated:", response.data); // For debugging
        onUpdate(response.data); // Update parent component with the updated task
        onClose(); // Close the modal after updating
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        setError("Failed to update task. Please try again later.");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Edit Task</h2>

        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Headline</label>
            <input
              type="text"
              value={updatedTask.headline}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, headline: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Description</label>
            <textarea
              value={updatedTask.description}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
