'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const HomePage = () => {
  const [channelsData, setChannelsData] = useState([]);
  const [formData, setFormData] = useState({
    channel_id: '',
    api_key: '',
  });

  useEffect(() => {
    const getChannels = async () => {
      try {
        const response = await axios.get(`${api_url}/v1/channels`);
        console.log('API response:', response.data.data);
        setChannelsData(response.data.data);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };

    getChannels(); // Run on mount
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const channel_id_entered = formData.channel_id;
    const username = formData.api_key;
    const password = '';

    // Create Base64 encoded credentials string
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await axios.post(
        `${api_url}/v1/subscribe/${channel_id_entered}`,
        {}, // Empty object as body
        {
          withCredentials: true,
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API response:', response.data);
      // Handle successful subscription here
    } catch (error) {
      console.error('Error fetching API:', error);

      // Handle different error cases
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          // Handle authentication failure - invalid API key
          console.log('Invalid API key');
          // Show your custom error message instead of browser prompt
          // e.g., setAuthError("Invalid API key");
        } else if (error.response.status === 409) {
          // Already subscribed
          console.log('Already subscribed to this channel');
          // e.g., setSubscriptionError("You're already subscribed to this channel");
        } else {
          // Handle other status codes
          console.log(
            `Error: ${error.response.data.message || 'Unknown error'}`
          );
        }
      } else {
        // Network error or request was cancelled
        console.log('Network error or request cancelled');
      }
    }
  };

  return (
    <div className="pt-10 px-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to House of Events!</h1>
      <p className="text-lg mb-4">Discover amazing event channels below.</p>

      {/* Table for displaying channels */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {channelsData.length > 0 ? (
              channelsData.map((channel) => (
                <tr key={channel.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{channel.id}</td>
                  <td className="py-3 px-6 font-semibold">{channel.name}</td>
                  <td className="py-3 px-6">{channel.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No channels available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Subscribe button is a form with channel_id and api_key  */}
      <form
        className="mt-6"
        action="/api/subscribe"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="channel_id"
          className="block text-sm font-medium text-gray-700"
        >
          Channel ID
        </label>
        <input
          type="text"
          name="channel_id"
          onChange={handleChange}
          id="channel_id"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:ring-2 focus:ring-offset-2"
        />
        <label
          htmlFor="api_key"
          className="block mt-2 text-sm font-medium text-gray-700"
        >
          API Key
        </label>
        <input
          type="text"
          name="api_key"
          onChange={handleChange}
          id="api_key"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:ring-2 focus:ring-offset-2"
        />
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default HomePage;
