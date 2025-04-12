import React, { useState } from 'react';

function RegistrationForm() {
  const [userType, setUserType] = useState('buyer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Seller-specific fields (can be conditionally rendered)
    storeName: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    // Reset seller-specific fields when switching to buyer
    if (type === 'buyer') {
      setFormData({ ...formData, storeName: '', description: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setRegistrationSuccess(false);

    // Basic client-side validation
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (userType === 'seller') {
      if (!formData.storeName.trim()) newErrors.storeName = 'Store name is required';
      if (!formData.description.trim()) newErrors.description = 'Store description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call (replace with your actual API endpoint)
    try {
      console.log('Submitting registration data:', { ...formData, userType });
      // const response = await fetch('/api/register', { // Your API endpoint
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ...formData, userType }),
      // });

      // if (response.ok) {
      setRegistrationSuccess(true);
      setFormData({ // Reset form after successful registration
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        storeName: '',
        description: '',
      });
      setErrors({});
      // } else {
      //   const errorData = await response.json();
      //   setErrors(errorData.errors || { general: 'Registration failed' });
      // }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'An unexpected error occurred' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create Your Account</h1>

          <div className="mb-4 flex justify-center space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                userType === 'buyer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              onClick={() => handleUserTypeChange('buyer')}
            >
              Buyer
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                userType === 'seller' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              onClick={() => handleUserTypeChange('seller')}
            >
              Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {userType === 'seller' && (
              <>
                <div>
                  <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                    Store Name
                  </label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${errors.storeName ? 'border-red-500' : ''}`}
                  />
                  {errors.storeName && <p className="mt-1 text-sm text-red-500">{errors.storeName}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Store Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${errors.description ? 'border-red-500' : ''}`}
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
              </>
            )}

            {errors.general && <p className="mt-4 text-sm text-red-500 text-center">{errors.general}</p>}
            {registrationSuccess && (
              <p className="mt-4 text-sm text-green-500 text-center">Registration successful! You can now log in.</p>
            )}

            <div>
              <button
                type="submit"
                className={`w-full py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-${
                  userType === 'buyer' ? 'blue' : 'green'
                }-500 focus:ring-offset-2 text-white font-semibold ${
                  userType === 'buyer' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                Register as {userType === 'buyer' ? 'Buyer' : 'Seller'}
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
              Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;