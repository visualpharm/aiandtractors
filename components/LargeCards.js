import React from 'react';
import Image from 'next/image';

export default function LargeCards({ title, items }) {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-4">
          {title}
        </h3>
      )}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center h-full p-5 md:p-7 border border-gray-100"
            tabIndex={0}
            aria-label={`${item.title}, ${item.description}`}
          >
            {item.logo && (
              <div className={`relative w-full mb-4 ${item.title.toLowerCase().includes('verge') ? 'max-h-[166px] scale-[1.3]' : 'max-h-32'}`}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="relative w-full h-full" style={{
                      aspectRatio: '2/1',
                      maxHeight: item.title.toLowerCase().includes('verge') ? '130px' : '100px',
                      margin: '0 auto'
                    }}>
                      <img
                        src={item.logo}
                        alt={item.title}
                        className="media-logo"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          display: 'block'
                        }}
                        loading="lazy"
                        draggable="false"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex-1 flex flex-col justify-center w-full">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1 leading-tight">
                {item.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-500 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}