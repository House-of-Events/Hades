'use client';
import axios from 'axios';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
console.log('API URL:', api_url);

const AccountCreationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const [errors, setErrors] = useState({});
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${api_url}/v1/accounts`, formData);
        console.log('API response:', response.data);
        setModalData(response.data.data);
        setIsOpen(true);
      } catch (error) {
        console.error('Error creating account:', error);
        // Handle API error here
        setErrors({
          api:
            error.response?.data?.message ||
            'Failed to create account. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    // Optionally reset form after successful submission
    setFormData({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {errors.api && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {errors.api}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
              placeholder="yourname@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
              placeholder="Minimum 8 characters"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.first_name ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
                placeholder="First name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.last_name ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
                placeholder="Last name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 
              transition-all font-medium text-lg mt-6 flex items-center justify-center
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center mb-4">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mb-2" />
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-center text-gray-900"
                    >
                      Account Created Successfully!
                    </Dialog.Title>
                    <p className="text-gray-500 text-center mt-1">
                      Your account has been created and is ready to use
                    </p>
                  </div>

                  {modalData && (
                    <div className="mt-6 space-y-5">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-medium text-gray-800">
                            {modalData.email}
                          </p>
                          <button
                            onClick={() => copyToClipboard(modalData.email)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Copy
                          </button>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-700 mb-1">
                          API Key{' '}
                          <span className="text-xs">
                            (Save this somewhere safe)
                          </span>
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-base font-mono bg-white p-2 rounded border border-blue-200 text-gray-800 overflow-auto w-64">
                            {modalData.api_key}
                          </p>
                          <button
                            onClick={() => copyToClipboard(modalData.api_key)}
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Copy Key
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <a
                      href="/"
                      className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all font-medium text-center block"
                      onClick={closeModal}
                    >
                      Continue to Dashboard
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AccountCreationPage;
