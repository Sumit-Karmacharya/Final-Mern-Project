

import React, { useState } from "react";
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";
import { useAuthContext } from "../../Hooks/UseAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to add a workout.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    const workout = { title, reps, load };

    const response = await fetch(
      "http://localhost:4000/api/workouts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);
    } else {
      setError(null);
      setTitle("");
      setReps("");
      setLoad("");
      setEmptyField([]);
      dispatch({ type: "CREATE_WORKOUTS", payload: json });

      // Show success toast notification
      toast.success("Workout added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105"
    >
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
        Add New Workout
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center bg-red-100 p-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Title Field */}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-gray-700 font-medium mb-2"
        >
          Workout Name
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter workout name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border-2 ${
            emptyField.includes("title")
              ? "border-red-500"
              : "border-gray-300"
          } rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
        />
        {emptyField.includes("title") && (
          <p className="text-red-500 text-sm mt-1">
            Workout name is required.
          </p>
        )}
      </div>

      {/* Reps Field */}
      <div className="mb-6">
        <label
          htmlFor="reps"
          className="block text-gray-700 font-medium mb-2"
        >
          Reps
        </label>
        <input
          type="number"
          id="reps"
          placeholder="Enter number of reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={`w-full p-3 border-2 ${
            emptyField.includes("reps") ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
        />
        {emptyField.includes("reps") && (
          <p className="text-red-500 text-sm mt-1">Reps are required.</p>
        )}
      </div>

      {/* Load Field */}
      <div className="mb-8">
        <label
          htmlFor="load"
          className="block text-gray-700 font-medium mb-2"
        >
          Load (kg)
        </label>
        <input
          type="number"
          id="load"
          placeholder="Enter load in kg"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={`w-full p-3 border-2 ${
            emptyField.includes("load") ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
        />
        {emptyField.includes("load") && (
          <p className="text-red-500 text-sm mt-1">Load is required.</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
      >
        Add Workout
      </button>
    </form>

    {/* Toast Container */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
  );
};

export default WorkoutForm;
