import React, { useEffect, useState } from "react";
import { FaUserEdit, FaSignOutAlt, FaKey, FaEnvelope, FaCamera } from "react-icons/fa";
import axios from "axios";
import { 
    getAuth, onAuthStateChanged, signOut, updatePassword, updateProfile, 
    reauthenticateWithCredential, EmailAuthProvider 
} from "firebase/auth";
import { app, auth } from "../Firebase/Firebase.config";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({ name: "", email: "", photo: "" });
    const [newName, setNewName] = useState("");
    const [newPhoto, setNewPhoto] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");  // New State
    const [newPassword, setNewPassword] = useState("");  
    const [editMode, setEditMode] = useState({
        name: false,
        email: false,
        password: false,
        photo: false
    });

    const navigate = useNavigate(); 

    useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    }, []);

    useEffect(() => {
        if (user) {
            axios.get(`https://taskmanager-server-db69.onrender.com/user/${user.email}`)
                .then(response => {
                    setProfile(response.data);
                    setNewName(response.data.name);
                    setNewPhoto(response.data.photo);
                    setNewEmail(response.data.email);
                })
                .catch(error => console.error("Error fetching user:", error));
        }
    }, [user]);

    const updateProfileData = async () => {
        try {
            const response = await axios.put(`https://taskmanager-server-db69.onrender.com/user/${user.email}`, {
                name: newName,
                photo: newPhoto,
                email: newEmail,
            });

            setProfile(response.data);
            alert("Profile updated successfully!");

            const userAuth = getAuth().currentUser;

            if (newName !== profile.name || newPhoto !== profile.photo) {
                await updateProfile(userAuth, {
                    displayName: newName,
                    photoURL: newPhoto
                });
            }

            if (newPassword !== "" && currentPassword !== "") {
                await updatePasswordInFirebase(currentPassword, newPassword);
            } else if (newPassword !== "") {
                alert("Please enter your current password to update the password.");
                return;
            }

            setEditMode({ name: false, email: false, password: false, photo: false });

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    const updatePasswordInFirebase = async (currentPassword, newPassword) => {
        try {
            const userAuth = getAuth().currentUser;
            
            if (!userAuth) {
                alert("User is not signed in.");
                return;
            }

            const credential = EmailAuthProvider.credential(userAuth.email, currentPassword);
            await reauthenticateWithCredential(userAuth, credential);

            await updatePassword(userAuth, newPassword);

            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password in Firebase: " + error.message);
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                alert("Logged out successfully!");
                navigate("/login"); 
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-green-500 p-6">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl text-center w-96">
                {user ? (
                    <>
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                alt="User Profile"
                                className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        <h2 className="text-2xl font-bold mt-4 text-white">{profile.name || "User Name"}</h2>
                        <p className="text-gray-200">{profile.email || "No Email"}</p>

                        {/* Edit Name */}
                        <div className="mt-4">
                            {!editMode.name ? (
                                <button className="text-blue-500" onClick={() => setEditMode({ ...editMode, name: true })}>
                                    <FaUserEdit className="inline mr-2" /> Update Name
                                </button>
                            ) : (
                                <input type="text" className="w-full p-2 rounded-lg border-gray-300 shadow-sm" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" />
                            )}
                        </div>

                        {/* Edit Photo */}
                        <div className="mt-4">
                            {!editMode.photo ? (
                                <button className="text-blue-500" onClick={() => setEditMode({ ...editMode, photo: true })}>
                                    <FaCamera className="inline mr-2" /> Update Photo
                                </button>
                            ) : (
                                <input type="text" className="w-full p-2 rounded-lg border-gray-300 shadow-sm" value={newPhoto} onChange={(e) => setNewPhoto(e.target.value)} placeholder="Enter new photo URL" />
                            )}
                        </div>

                        {/* Edit Email */}
                        <div className="mt-4">
                            {!editMode.email ? (
                                <button className="text-blue-500" onClick={() => setEditMode({ ...editMode, email: true })}>
                                    <FaEnvelope className="inline mr-2" /> Update Email
                                </button>
                            ) : (
                                <input type="email" className="w-full p-2 rounded-lg border-gray-300 shadow-sm" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter new email" />
                            )}
                        </div>

                        {/* Edit Password */}
                        <div className="mt-4">
                            {!editMode.password ? (
                                <button className="text-blue-500" onClick={() => setEditMode({ ...editMode, password: true })}>
                                    <FaKey className="inline mr-2" /> Update Password
                                </button>
                            ) : (
                                <>
                                    <input type="password" className="w-full p-2 rounded-lg border-gray-300 shadow-sm mb-2" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
                                    <input type="password" className="w-full p-2 rounded-lg border-gray-300 shadow-sm" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
                                </>
                            )}
                        </div>

                        {/* Update Profile Button */}
                        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-all mt-4" onClick={updateProfileData}>
                            <FaUserEdit className="mr-2" /> Update Profile
                        </button>

                        {/* Logout Button */}
                        <button className="w-full px-4 py-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all mt-4" onClick={handleLogout}>
                            <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                    </>
                ) : (
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all mt-6" onClick={handleLogin}>
                        <FaSignOutAlt className="mr-2" /> Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
