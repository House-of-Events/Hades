'use client';
import { useState } from 'react';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const Subscribe = () => {
  const [formData, setFormData] = useState({
    channel_id: '',
    api_key: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.channel_id.trim()) {
      setError('Please enter a Channel ID');
      return;
    }

    if (!formData.api_key.trim()) {
      setError('Please enter your API Key');
      return;
    }

    const channel_id_entered = formData.channel_id;
    const username = formData.api_key;
    const password = '';
    const credentials = btoa(`${username}:${password}`);

    // Show loading state
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${api_url}/v1/subscribe/${channel_id_entered}`,
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(
        'Successfully subscribed to the channel! You should be receiving an email to join our channel soon.'
      );
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid API key. Please check and try again.');
        } else if (error.response.status === 409) {
          setError('You are already subscribed to this channel.');
        } else {
          setError(
            error.response.data.message ||
              'An error occurred. Please try again.'
          );
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto">
      <div className="container mt-[100px]">
        <div className="flex flex-col gap-4">
          <img src="/images/logo.png" alt="logo" className="h-8 mx-auto" />
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6 items-center">
              <h3 className="font-semibold tracking-tight text-xl">
                Subscribe to a Channel
              </h3>
              <p className="text-sm text-zinc-600">
                Enter your channel ID and API key to get started
              </p>
            </div>
            <div className="p-6 pt-0">
              {/* Notification Messages */}
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="channel_id"
                  >
                    Channel ID
                  </label>
                  <input
                    type="text"
                    name="channel_id"
                    id="channel_id"
                    value={formData.channel_id}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-input"
                    placeholder="Enter channel ID"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="api_key"
                  >
                    API Key
                  </label>
                  <input
                    type="text"
                    name="api_key"
                    id="api_key"
                    value={formData.api_key}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-input"
                    placeholder="Enter your API key"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-white hover:bg-zinc-900/90 h-10 px-4 py-2 w-full"
                >
                  {loading ? (
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
                      Processing...
                    </>
                  ) : (
                    'Subscribe to Channel'
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="mx-auto flex gap-1 text-sm">
            <p>Need an API key?</p>
            <a href="/account" className="underline">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
