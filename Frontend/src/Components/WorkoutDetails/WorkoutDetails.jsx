

import React from "react";
import { FaDumbbell, FaCalendarAlt } from "react-icons/fa"; // Icons for load and date
import { MdFitnessCenter, MdDelete } from "react-icons/md"; // Icons for workout name and delete
import { BiDetail } from "react-icons/bi"; // Icon for description
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";

import { useAuthContext } from "../../Hooks/UseAuthContext";

import { toast } from "react-toastify";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const { user } = useAuthContext();

  // Check if user is logged in and has permission to delete workout
  const handleClick = async () => {
    if (!user) {
      toast.error("You must be logged in to delete workouts.");
      return;
    }
    const response = await fetch(
      "https://final-mern-project-backend.onrender.com/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    dispatch({ type: "DELETE_WORKOUT", payload: { _id: workout._id } });
  };

  // Format the date
  const formattedDate = new Date(workout.createdAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
   
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    {/* Delete Icon */}
    <button
      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition duration-200"
      onClick={handleClick}
    >
      <MdDelete className="text-xl" />
    </button>

    {/* Workout Name */}
    <div className="flex items-center space-x-4 mb-6">
      <MdFitnessCenter className="text-teal-600 text-4xl" />
      <h1 className="text-gray-900 text-3xl font-bold dark:text-white">
        {workout.title}
      </h1>
    </div>

    {/* Workout Details */}
    <div className="grid gap-4">
      <div className="flex items-center space-x-4">
        <BiDetail className="text-blue-500 text-3xl" />
        <p className="text-gray-700 text-lg dark:text-gray-300">
          <span className="font-semibold">Reps:</span> {workout.reps}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <FaDumbbell className="text-green-600 text-3xl" />
        <p className="text-gray-700 text-lg dark:text-gray-300">
          <span className="font-semibold">Load:</span> {workout.load} kg
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <FaCalendarAlt className="text-yellow-500 text-3xl" />
        <p className="text-gray-700 text-lg dark:text-gray-300">
          <span className="font-semibold">Created At:</span> {formattedDate}
        </p>
      </div>
    </div>
  </div>
  );
};

export default WorkoutDetails;
