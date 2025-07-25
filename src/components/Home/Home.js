'use client';
import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const HomePage = () => {
  const [channelsData, setChannelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    channel_id: '',
    api_key: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getChannels = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${api_url}/v1/channels`);
        console.log('Channels data:', response.data.data);
        setChannelsData(response.data.data);
        setFetchError(null);
      } catch (error) {
        console.error('Error fetching channels:', error);
        setFetchError('Unable to load channels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getChannels();
  }, []);

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
        'Successfully subscribed to the channel! You should be recieving an email to join our channel soon.'
      );
      // Optionally refresh the channels list
      const channelsResponse = await axios.get(`${api_url}/v1/channels`);
      setChannelsData(channelsResponse.data.data);
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
    <div className="">
            <Navbar />

      <div className="max-w-6xl mx-auto">
        
        <div className="pb-[50px] mt-[7rem]">
          <h3 className="text-2xl mb-4 title-header font-montserrat font-black ">
            House of Events{' '}
          </h3>
          <p className="title-text font-montserrat opacity-70 text-[20px]">
            Start subscribing to event channels from around the world - do not
            ever miss out on a sports game!
          </p>
        </div>

        <div className="bg-black h-[40rem] flex items-center justify-center mt-[100px]">
          <div className="w-full h-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/taxldmY8V-Y?si=veiub6rj82vsyxUO"
              title="House of Events Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* About us */}

        <div className="mb-16 mt-24 py-16 px-8 rounded-3xl shadow-m">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Image Column */}
              <div className="md:col-span-5">
                <div className="p-[2rem] rounded-lg w-full">
                  <div className="relative h-[500px] w-full">
                    <Image
                      src="https://i.pinimg.com/1200x/28/a5/2d/28a52d06f1ad2fa38cac49555ee21926.jpg"
                      alt="Events"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
              {/* Content Column */}
              <div className="md:col-span-7">
                <div className="flex items-center mb-6">
                  <div className="h-1 w-12 bg-background mr-4"></div>
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    About{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r text-background">
                      House of Events
                    </span>
                  </h2>
                </div>

                <div className="space-y-6 font-light">
                  <p className="text-l text-gray-800 leading-relaxed">
                    House of Events is your ultimate companion for staying
                    connected to events that matter to you. Our platform enables
                    you to subscribe to specialized event channels from across
                    the globe, ensuring you never miss a moment of what you love
                    most. Whether you're passionate about sports, concerts,
                    conferences, or cultural festivities, we've got you covered!
                  </p>

                  <p className="text-l text-gray-800 leading-relaxed">
                    Sports enthusiasts will particularly love our real-time
                    notification system that alerts you before your favorite
                    teams take the field. Imagine getting a timely reminder one
                    hour before your beloved soccer team kicks off at 10AM EST,
                    giving you perfect preparation time to tune in. Our platform
                    doesn't just list events—it actively connects you to them at
                    the right moment.
                  </p>

                  <p className="text-l text-gray-800 leading-relaxed">
                    Beyond just receiving notifications, House of Events
                    empowers you to create and curate your own channels. Share
                    your event discoveries with a community of like-minded
                    enthusiasts, build your following, and become the go-to
                    source for specific event categories. From local happenings
                    to global phenomena, we're building a world where no
                    exciting event goes unnoticed.
                  </p>
                </div>


               
              </div>
            </div>
          </div>
        </div>

        {/* Channels Section */}
        <div className="mb-8 mt-10">
          <h2 className="text-xl mb-4">List of available Channels</h2>

          {fetchError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{fetchError}</p>
            </div>
          )}

          {loading && channelsData.length === 0 ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-indigo-600">
                Loading channels...
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-tableHeaderColor">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {channelsData.length > 0 ? (
                    channelsData.map((channel) => (
                      <tr
                        key={channel.id}
                        className="hover:bg-indigo-50 transition-colors duration-150"
                        onClick={() =>
                          setFormData({ ...formData, channel_id: channel.id })
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {channel.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-700">
                          {channel.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {channel.description}
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span
                            className={`px-4 py-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              channel.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {channel.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        {fetchError
                          ? null
                          : 'No channels available at the moment'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <hr></hr>
        {/* Subscription Form */}
        <h2 className="text-xl mb-4 mt-[3rem]">Subscribe to a channel now!</h2>
        <div className="">
          <p className="mb-3 opacity-75 text-[14px]">
            Enter a channel ID and your API key to subscribe to events. (You
            will need an account to get an API key). Create one for free here if
            you have not -{' '}
            <span>
              <a href="/account" className="text-black">
                Create Account
              </a>
            </span>
          </p>

          {/* Notification Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <div className="flex flex-row gap-x-10 w-full justify-even">
              <div className="w-[50%]">
                <label
                  htmlFor="channel_id"
                  className="block text-sm font-medium text-gray-700 mt-[1rem]"
                >
                  Channel ID
                </label>
                <input
                  type="text"
                  name="channel_id"
                  id="channel_id"
                  value={formData.channel_id}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                  placeholder="Enter channel ID"
                />
              </div>

              <div className="w-[50%]">
                <label
                  htmlFor="api_key"
                  className="block text-sm font-medium text-gray-700 mt-[1rem]"
                >
                  API Key
                </label>
                <input
                  type="text"
                  name="api_key"
                  id="api_key"
                  value={formData.api_key}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                  placeholder="Enter your API key"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white mt-[1rem] ${
                  loading
                    ? 'bg-indigo-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150`}
              >
                {loading ? 'Processing...' : 'Subscribe to Channel'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 mb-[100px]">
            <p>
              Need an API key? Contact our support team for assistance or create
              an account
              <a className="text-black" href="/account">
                {' '}
                here{' '}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
