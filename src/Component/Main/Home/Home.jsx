import React, { useState } from 'react';
import TaskForm from '../Task/TaskForm';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskSubmitted, setTaskSubmitted] = useState(false);  // Track task submission
  const [newTask, setNewTask] = useState(null);

  // Function to handle task submission
  const handleTaskSubmit = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskSubmitted(true);
    setNewTask(newTask);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Task Submission Feedback */}
      {taskSubmitted && (
        <div className="text-green-500 mb-4">
          <p>Task '{newTask.headline}' added successfully!</p>
        </div>
      )}

      {/* Pass handleTaskSubmit as onTaskSubmit prop to TaskForm */}
      <TaskForm onTaskSubmit={handleTaskSubmit} />

      {/* Render list of tasks */}
      <div className="mt-6">
        <ul className="space-y-4 mt-4">
          {tasks.map((task, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-gray-700">{task.headline}</h3>
              <p className="text-gray-600 mt-2">{task.description}</p>
              <span className="block text-sm text-gray-500 mt-2">Created at: {new Date(task.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
