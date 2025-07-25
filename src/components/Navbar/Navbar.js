import Image from 'next/image';
import Link from 'next/link';
export default function Navbar() {
  return (
    <div className="flex flex-col w-full">
      {/* Black Banner */}
      <div className="bg-black text-white py-2 flex justify-center items-center">
        <span className="text-center text-[12px] font-montserrat">One stop platform to never miss out on a sports game!</span>
      </div>

      {/* Main Navbar */}
      <nav className="flex flex-row justify-between items-center px-8 py-4">
        {/* Left Side */}
        <div className="flex flex-row gap-8 items-center">
          <Link href="/">
            <Image 
              src="/images/logo.png" 
              alt="House of Events Logo" 
              width={220} 
              height={60}
              className="h-12 w-auto" 
          />
          </Link>
          <a href="/product" className="text-[#020202] px-4 py-2 text-sm font-normal leading-5 opacity-70 hover:opacity-100 transition-all duration-200 ease-in-out">Product</a>
          <a href="/channels" className="text-[#020202] px-4 py-2 text-sm font-normal leading-5 opacity-70 hover:opacity-100 transition-all duration-200 ease-in-out">Channels</a>
        </div>
        {/* Right Side */}
        <div className="flex flex-row gap-4 items-center">
          <a href="/docs" className="text-[#020202] px-4 py-2 text-sm font-normal leading-5 opacity-70 hover:opacity-100 transition-all duration-200 ease-in-out">View Docs</a>
          
          <a href="/account" className="text-[#020202] px-4 py-2 text-sm font-normal leading-5 opacity-70 hover:opacity-100 transition-all duration-200 ease-in-out">Sign Up</a>
        </div>
      </nav>
    </div>
  );
}