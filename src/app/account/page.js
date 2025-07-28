'use client';
import axios from 'axios';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar/Navbar';

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
    <div>
      <Navbar />
      <section className="max-w-6xl mx-auto">
        <div className="container mt-[100px]">
          <div className="flex flex-col gap-4">
            <img src="/images/logo.png" alt="logo" className="h-8 mx-auto" />
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto w-full max-w-md">
              <div className="flex flex-col space-y-1.5 p-6 items-center">
                <h3 className="font-semibold tracking-tight text-xl">
                  Create your account
                </h3>
                <p className="text-sm text-zinc-600">
                  Enter your information to get started
                </p>
              </div>
              <div className="p-6 pt-0">
                {errors.api && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                    {errors.api}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        errors.email ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="m@example.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        errors.password ? 'border-red-500' : 'border-input'
                      }`}
                      placeholder="Minimum 8 characters"
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          errors.first_name ? 'border-red-500' : 'border-input'
                        }`}
                        placeholder="First name"
                        required
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.first_name}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="last_name"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          errors.last_name ? 'border-red-500' : 'border-input'
                        }`}
                        placeholder="Last name"
                        required
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.last_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-white hover:bg-zinc-900/90 h-10 px-4 py-2 w-full"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                </form>
              </div>
            </div>
            <div className="mx-auto flex gap-1 text-sm">
              <p>Already have an account and an API key?</p>
              <a href="/" className="underline">
                Enter Dashboard
              </a>
            </div>
          </div>
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
      </section>
    </div>
  );
};

export default AccountCreationPage;
