import React, { useState } from 'react';
import TaskForm from '../Task/TaskForm';

const Home = () => {
    const [tasks, setTasks] = useState([]);

    // Function to handle task submission
    const handleTaskSubmit = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <div>
            {/* Pass handleTaskSubmit as onTaskSubmit prop to TaskForm */}
            <TaskForm onTaskSubmit={handleTaskSubmit} />
            
            {/* Render list of tasks */}
            <div className="tasks-list">
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <h3>{task.headline}</h3>
                            <p>{task.description}</p>
                            <span>{task.createdAt}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
