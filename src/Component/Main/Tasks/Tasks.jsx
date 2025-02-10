import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import ConfirmationModal from "./ConfirmationModal"; // Import the confirmation modal

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to control the confirmation modal visibility

  // Fetch tasks
  useEffect(() => {
    axios
      .get("https://taskmanager-server-db69.onrender.com/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
              {/* Click on headline to show modal */}
              <button onClick={() => setSelectedTask(task)} className="text-left flex-1">
                <h3 className="font-semibold text-lg text-gray-700 hover:text-blue-500 transition">
                  {task.headline}
                </h3>
              </button>

              {/* Three-dot menu */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === task._id ? null : task._id)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <FiMoreVertical size={20} />
                </button>

                {dropdownOpen === task._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg rounded-lg py-2">
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setDropdownOpen(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => {
                        setTaskToDelete(task);
                        setDropdownOpen(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modals */}
      {selectedTask && <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdate={(updatedTask) => {
            setTasks((prevTasks) =>
              prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
            );
            setEditingTask(null); // Close the modal after update
            setShowConfirmationModal(true); // Show confirmation modal after update
          }}
        />
      )}
      {taskToDelete && (
        <DeleteTaskModal
          task={taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onDelete={() => {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete._id));
            setTaskToDelete(null); // Close delete modal after deletion
          }}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          message="Your task has been updated. Please refresh the page to see the changes."
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default Tasks;
