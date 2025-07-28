'use client';
import Image from 'next/image';

const About = () => {
  return (
    <div className="mb-16 mt-12 py-8 px-8 rounded-3xl shadow-m">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-gray-600 pb-4 mb-8">
          <h3 className="text-xl font-semibold leading-6 text-gray-800">
            About House of Events
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="/images/placeholders/original/neon-1.webp"
                alt=""
              />
            </div>
            <div className="flex-1 p-6">
              <h3 className="text-xl font-semibold leading-none tracking-tighter text-gray-800 mb-3">
                Real-time Event Notifications
              </h3>
              <p className="text-base font-normal text-gray-600">
                Get instant alerts before your favorite events start. Never miss
                a sports game, concert, or important event with our intelligent
                notification system that keeps you connected to what matters
                most.
              </p>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="/images/placeholders/original/neon-2.webp"
                alt=""
              />
            </div>
            <div className="flex-1 p-6">
              <h3 className="text-xl font-semibold leading-none tracking-tighter text-gray-800 mb-3">
                Global Event Channels
              </h3>
              <p className="text-base font-normal text-gray-600">
                Subscribe to specialized event channels from around the world.
                From local sports teams to international festivals, we've got
                you covered with comprehensive event discovery and management.
              </p>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="/images/placeholders/original/neon-3.webp"
                alt=""
              />
            </div>
            <div className="flex-1 p-6">
              <h3 className="text-xl font-semibold leading-none tracking-tighter text-gray-800 mb-3">
                Community-Driven Platform
              </h3>
              <p className="text-base font-normal text-gray-600">
                Create and share your own event channels with the community.
                Build your following and become the go-to source for specific
                event categories, from local happenings to global phenomena.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
