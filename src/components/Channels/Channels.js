'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const Channels = () => {
  const [channelsData, setChannelsData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="scroll-section opacity-0 transform translate-y-8 transition-all duration-1000 ease-out mb-8 mt-[100px]">
      <p className="mb-4 text-xs text-muted-foreground md:pl-5">{'Channels'}</p>
      <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl ">
        List of available Channels
      </h2>

      {fetchError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{fetchError}</p>
        </div>
      )}

      {loading && channelsData.length === 0 ? (
        <div className="flex justify-center py-8 lg:mt-20  md:px-5">
          <div className="animate-pulse text-indigo-600">
            Loading channels...
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg lg:mt-20  md:px-5">
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
                    {fetchError ? null : 'No channels available at the moment'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Channels;
