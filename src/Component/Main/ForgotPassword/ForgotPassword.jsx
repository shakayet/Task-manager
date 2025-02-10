import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent. Check your inbox.");
            setError(""); // Clear any previous error
        } catch (err) {
            setError(err.message);
            setMessage(""); // Clear any success message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Forgot Your Password?
                </h2>
                <p className="text-center">Please enter your email to reset <br></br> your password.</p>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-4 mt-16">
                        <label className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-500 text-white py-2 px-4 rounded-lg"
                    >
                        Get Reset Link
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <Link to="/login" className="text-slate-500 hover:underline mt-4 block text-center">Go To Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
