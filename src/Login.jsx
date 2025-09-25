import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registeredUser = useSelector((state) => state.auth.registeredUser);
  const currentUser = useSelector((state) => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Please fill all fields");
      return;
    }

    // Agar user ne signup hi nahi kiya
    if (!registeredUser) {
      alert("Please signup first")
      setError("Please signup first");
      navigate("/signup");
      return;
    }

    // Agar credentials sahi hai
    if (registeredUser.name === name && registeredUser.email === email) {
      dispatch(login({ name, email }));
      setError("");
      alert("Login successful!");
      navigate("/fetch");
    } else {
      setError("Invalid credentials");
    }
    setName("");
    setEmail("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>

        {currentUser && (
          <div className="mt-4 text-center">
            <h3 className="font-semibold">Current User:</h3>
            <p>Name: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
