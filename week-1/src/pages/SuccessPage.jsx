// Success.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {}; // Get formData from navigation state

  if (!formData) {
    // If no data, redirect back to registration or show a message
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            No registration data found!
          </h2>
          <p className="text-gray-700 mb-6">
            Please go back and complete the registration form.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          Registration Successful! 🎉
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Thank you for registering. Here are your submitted details:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <div className="col-span-2">
            <h3 className="font-semibold text-xl border-b pb-2 mb-4">
              Personal Details
            </h3>
          </div>
          <div>
            <p>
              <span className="font-medium">First Name:</span>{" "}
              {formData.firstName}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Last Name:</span>{" "}
              {formData.lastName}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Username:</span> {formData.username}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Email:</span> {formData.email}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Phone:</span> {formData.countryCode}{" "}
              {formData.phoneNumber}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Country:</span> {formData.country}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">City:</span> {formData.city}
            </p>
          </div>
          <div className="col-span-2 mt-4">
            <h3 className="font-semibold text-xl border-b pb-2 mb-4">
              Identification Details
            </h3>
          </div>
          <div>
            <p>
              <span className="font-medium">PAN No.:</span> {formData.panNo}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Aadhar No.:</span>{" "}
              {formData.aadharNo}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300 ease-in-out"
          >
            Register Another Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
