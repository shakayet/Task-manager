import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskSubmit }) => {
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);  // New state for modal visibility

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!headline || !description) {
            alert("Please fill in all fields");
            return;
        }

        const newTask = {
            headline,
            description,
            createdAt: new Date().toLocaleString(), // Auto-assign date
        };

        try {
            const response = await axios.post('http://localhost:5000/tasks', newTask);
            if (response.status === 201) {
                onTaskSubmit(response.data);
                setHeadline('');
                setDescription('');
                setShowModal(true);  // Show success modal
            }
        } catch (error) {
            console.error('Error posting task:', error);
            alert("An error occurred while posting the task.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 rounded-2xl shadow-lg border border-green-300 
                        bg-white/30 backdrop-blur-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">📝 Create a New Task</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Headline */}
                <div>
                    <label className="block text-gray-800 font-semibold">Task Headline:</label>
                    <input 
                        type="text"
                        className="w-full px-4 py-2 mt-1 text-lg border border-green-400 rounded-xl 
                                   focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
                        placeholder="Enter task headline..."
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-800 font-semibold">Task Description:</label>
                    <textarea
                        className="w-full px-4 py-2 mt-1 text-lg border border-green-400 rounded-xl 
                                   focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
                        placeholder="Enter task description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-xl text-lg font-semibold 
                               hover:bg-green-600 hover:scale-105 transition-all duration-200 ease-in-out">
                    ✅ Add Task
                </button>
            </form>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg text-center w-80">
                        <h2 className="text-2xl font-bold text-green-600 mb-3">🎉 Task Added!</h2>
                        <p className="text-gray-700">Your task has been successfully added.</p>
                        <button 
                            onClick={() => setShowModal(false)}
                            className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg font-semibold 
                                       hover:bg-green-600 transition-all">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskForm;
