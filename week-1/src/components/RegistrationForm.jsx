// RegistrationForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // New state to track touched fields
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Expanded Hardcoded country and city map
  const countryCityMap = {
    "": [], // Empty array for initial 'Select Country'
    India: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Solapur",
      "Pune",
      "Hyderabad",
    ],
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    UK: ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
  };

  // Expanded Phone Country Codes
  const phoneCountryCodes = [
    { code: "+1", label: "+1 (USA/CAN)" },
    { code: "+44", label: "+44 (UK)" },
    { code: "+91", label: "+91 (India)" },
    { code: "+61", label: "+61 (Australia)" },
    { code: "+49", label: "+49 (Germany)" },
    // Add more as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Validate instantly after change for UX, but only display if touched
    // We'll refine the display logic in the JSX
    const newErrors = runValidation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    // Re-validate on blur to show specific errors
    const newErrors = runValidation(name, formData[name]);
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const runValidation = (fieldName, value) => {
    let fieldErrors = {};

    // Required check
    if (value.trim() === "") {
      fieldErrors[fieldName] = `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required.`;
      return fieldErrors; // Return immediately if empty for required fields
    }

    // Specific field validations
    switch (fieldName) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          fieldErrors.email = "Invalid email format.";
        }
        break;
      case "phoneNumber":
        // Example: 10 digits exact
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          fieldErrors.phoneNumber = "Phone number must be 10 digits.";
        }
        break;
      case "panNo":
        // PAN format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(value.toUpperCase())) {
          fieldErrors.panNo = "Invalid PAN format (e.g., ABCDE1234F).";
        }
        break;
      case "aadharNo":
        // Aadhar format: 12-digit numeric
        const aadharRegex = /^\d{12}$/;
        if (!aadharRegex.test(value)) {
          fieldErrors.aadharNo = "Aadhar number must be 12 digits.";
        }
        break;
      case "password":
        // Example password validation: min 6 chars, at least one digit, one uppercase, one lowercase
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(value)) {
          fieldErrors.password =
            "Password must be at least 6 chars, contain a digit, uppercase & lowercase letter.";
        }
        break;
      default:
        break;
    }
    return fieldErrors;
  };

  // Effect to re-validate entire form for submit button enablement
  useEffect(() => {
    let formHasErrors = false;
    let allFieldsFilled = true;

    const currentErrors = {}; // Temporarily collect all errors

    for (const key in formData) {
      const fieldErrors = runValidation(key, formData[key]);
      if (Object.keys(fieldErrors).length > 0) {
        formHasErrors = true;
      }
      Object.assign(currentErrors, fieldErrors); // Merge errors

      if (typeof formData[key] === "string" && formData[key].trim() === "") {
        allFieldsFilled = false;
      }
    }

    // Update errors state for display logic (important for errors that persist even after value becomes valid)
    // This makes sure errors are cleared if a field becomes valid
    setErrors(currentErrors);

    // Form is valid if no errors are found AND all fields are filled
    setIsFormValid(!formHasErrors && allFieldsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched for final validation display on submit
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    // Run a full validation check just before submission
    let finalErrors = {};
    for (const key in formData) {
      Object.assign(finalErrors, runValidation(key, formData[key]));
    }
    setErrors(finalErrors);

    if (Object.keys(finalErrors).length === 0) {
      // If no errors after final check
      console.log("Registration Data:", formData);
      navigate("/success", { state: { formData } });
    } else {
      console.log("Form has validation errors:", finalErrors);
      alert("Please correct the errors in the form.");
    }
  };

  // Helper to render error message only if field is touched and has an error
  const renderError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? (
      <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>
    ) : null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register Now
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {renderError("firstName")}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {renderError("lastName")}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {renderError("username")}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {renderError("email")}
          </div>

          {/* Password with Show/Hide Toggle */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                // Eye-slash icon (hide)
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.636-1.89a4.881 4.881 0 013.444 0M17.657 14.773A4.992 4.992 0 0112 17c-1.298 0-2.505-.386-3.486-1.056m-4.215-4.215a10.05 10.05 0 01-.157-1.423C2.955 6.943 6.745 4 12 4c1.624 0 3.149.324 4.516.899m-1.421 2.943L21 21l-1.414-1.414L3 3l1.414 1.414z"
                  />
                </svg>
              ) : (
                // Eye icon (show)
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            {renderError("password")}
          </div>

          {/* Phone Number */}
          <div className="flex space-x-2">
            <div className="w-1/4">
              <label
                htmlFor="countryCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Code
              </label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {phoneCountryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-3/4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
              {renderError("phoneNumber")}
            </div>
          </div>

          {/* Country Dropdown */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Country</option>
              {Object.keys(countryCityMap)
                .filter((countryName) => countryName !== "") // Filter out the empty option's key
                .map((countryName) => (
                  <option key={countryName} value={countryName}>
                    {countryName}
                  </option>
                ))}
            </select>
            {renderError("country")}
          </div>

          {/* City Dropdown (Dynamic based on Country) */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={!formData.country} // Disable if no country is selected
              required
            >
              <option value="">Select City</option>
              {formData.country &&
                countryCityMap[formData.country]?.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
            </select>
            {renderError("city")}
          </div>

          {/* PAN No. */}
          <div>
            <label
              htmlFor="panNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              PAN No.
            </label>
            <input
              type="text"
              id="panNo"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {renderError("panNo")}
          </div>

          {/* Aadhar No. */}
          <div>
            <label
              htmlFor="aadharNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Aadhar No.
            </label>
            <input
              type="text"
              id="aadharNo"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {renderError("aadharNo")}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
