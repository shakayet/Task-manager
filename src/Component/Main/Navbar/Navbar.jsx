import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiUser, FiFileText } from "react-icons/fi";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../Firebase/Firebase.config";
import axios from 'axios';  // You need to install axios

const auth = getAuth(app);

const Navbar = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);

    // Fetch user data when the user is logged in
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const response = await axios.get(`https://taskmanager-server-db69.onrender.com/users/${user.uid}`);
                    console.log("Fetched user data:", response.data); // Debugging log
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Check if photoURL or user data exists before rendering image
    const userProfilePhoto = userData?.photo || user?.photoURL || "https://i.ibb.co/4pDNDk1/default-avatar.png";

    return (
        <nav className="bg-green-500 shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-3">
                {/* Left Side: Logo / Home Button */}
                <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
                    <FiHome /> Home
                </Link>

                {/* Center: Navigation Links */}
                <div className="hidden md:flex space-x-6 text-white text-lg">
                    <Link to="/task" className="hover:text-gray-200 flex items-center gap-1">
                        <FiCheckSquare /> Task
                    </Link>
                    <Link to="/home" className="hover:text-gray-200 flex items-center gap-1">
                        <FiFileText /> Form
                    </Link>
                    <Link to="/profile" className="hover:text-gray-200 flex items-center gap-1">
                        <FiUser /> Profile
                    </Link>
                </div>

                {/* Right Side: User Avatar */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full border-2 border-white">
                            {/* Display the user photo from Firebase or fallback */}
                            <img
                                alt="User Profile"
                                src={user?.photoURL} 
                                className="object-cover w-full h-full" // Ensure image fills the circle
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
