import React from 'react';

const SplashScreen = () => {
  return (
    <div className="p-2 m-2 border bg-[#F9F9F9] rounded-lg shadow relative w-64 h-80 flex flex-col justify-center items-center">
      <div className="animate-pulse w-full">
        <h3 className="font-medium text-[#606060] mb-2 text-base leading-5 bg-gray-300 h-5 w-3/4 rounded"></h3>
        <p className="text-sm text-[#797979] mb-2 leading-4 bg-gray-200 h-8 w-full rounded"></p>
        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-1 rounded-lg bg-gray-300 w-16 h-6"></span>
        </div>
        <div className="text-xs text-[#606060] mt-2">
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 w-24 h-4 rounded"></span>
          </div>
        </div>
        <p className="text-[#797979] text-sm pl-1 pt-3 bg-gray-200 w-32 h-4 rounded"></p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;