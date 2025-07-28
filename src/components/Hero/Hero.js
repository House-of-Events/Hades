'use client';

const Hero = () => {
  return (
    <div className="scroll-section opacity-0 transform translate-y-8 transition-all duration-1000 ease-out pb-[50px] mt-[7rem]">
      <h3 className="mb-6 text-4xl font-bold leading-none tracking-tighter md:text-[7vw] lg:text-8xl tracking-[-0.02em]">
        House of Events{' '}
      </h3>
      <p className="max-w-2xl text-zinc-600 md:text-[2vw] lg:text-xl">
        Start <span className="text-cyan-500">subscribing</span> to event
        channels from around the world -{' '}
        <span className="text-cyan-500">do not</span> ever miss out on a sports
        game!
      </p>
    </div>
  );
};

export default Hero;
