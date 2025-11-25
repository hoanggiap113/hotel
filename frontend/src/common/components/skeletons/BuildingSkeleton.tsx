import React from 'react';

const BuildingSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-white animate-pulse"
        >
          <div className="flex gap-4">
            <div className="w-64 h-48 bg-gray-200 rounded-lg flex-shrink-0" />

            {/* Content placeholder */}
            <div className="flex-1 space-y-3">
              {/* Title */}
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              
              {/* Location */}
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>

              {/* Amenities */}
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>

              {/* Price and button */}
              <div className="flex justify-between items-center mt-4">
                <div className="h-8 bg-gray-200 rounded w-32" />
                <div className="h-10 bg-gray-200 rounded w-28" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuildingSkeleton;