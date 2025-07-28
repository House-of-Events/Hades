'use client';

const SubscribeCTA = () => {
  return (
    <div className="scroll-section opacity-0 transform translate-y-8 transition-all duration-1000 ease-out mt-[60px]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium md:pl-5 lg:text-2xl mb-4">
          Ready to Subscribe?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Use your API key to subscribe to any channel and start receiving event
          notifications!
        </p>
        <a
          href="/subscribe"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-white hover:bg-zinc-900/90 h-10 px-6 py-2"
        >
          Subscribe Now
        </a>
      </div>
    </div>
  );
};

export default SubscribeCTA;
