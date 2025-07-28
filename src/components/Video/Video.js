'use client';

const Video = () => {
  return (
    <div className="scroll-section opacity-0 transform translate-y-8 transition-all duration-1000 ease-out bg-black h-[40rem] flex items-center justify-center mt-[60px]">
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
  );
};

export default Video;
