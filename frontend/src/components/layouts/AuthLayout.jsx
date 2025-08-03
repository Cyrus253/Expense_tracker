import React from 'react';// Ensure it's a valid URL or use `next/image` if needed

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen p-10">
      {/* Left side: Auth Form */}
      <div className="w-full md:w-1/2 px-6 pt-8 pb-12 overflow-y-auto">
        <h2 className="text-3xl text-center font-bold text-fuchsia-800 mb-11">Expense Tracker</h2>
        {children}
      </div>

      {/* Right side: Image (now visible on all screens) */}
      <div className="w-full hidden md:block  md:w-1/2 h-64 md:h-auto relative">
        <img
          src="/Card_2.jpg"
          alt="Auth Visual"
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
