import React, { useState } from "react";
import axios from "axios";

const EditTaskModal = ({ task, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask).then((response) => {
      onUpdate(response.data);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Headline</label>
            <input
              type="text"
              value={updatedTask.headline}
              onChange={(e) => setUpdatedTask({ ...updatedTask, headline: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Description</label>
            <textarea
              value={updatedTask.description}
              onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
