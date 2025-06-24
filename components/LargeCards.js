import React from 'react';
import Image from 'next/image';

export default function LargeCards({ title, items }) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-4">
          {title}
        </h3>
      )}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full p-5 md:p-7 border border-gray-100 text-left ${
              item.isIntro ? 'lg:col-span-1' : ''
            }`}
            tabIndex={0}
            aria-label={`${item.title}, ${item.description}`}
          >
            {/* Flag icon for government agencies */}
            {item.flagClass && (
              <div className="mb-4 flex justify-start">
                <span 
                  className={`${item.flagClass} text-6xl`}
                  style={{
                    fontSize: '4rem',
                    lineHeight: '1',
                    display: 'block'
                  }}
                ></span>
              </div>
            )}
            
            {/* Regular logo for other cards */}
            {item.logo && (
              <div className="relative w-full mb-4 max-h-32">
                <img
                  src={item.logo}
                  alt={item.title}
                  className={`media-logo ${
                    item.title.toLowerCase().includes('verge') ? 'scale-[1.3]' : 
                    item.logo && item.logo.includes('product-hunt') ? 'scale-[1.3]' : 
                    item.logo && item.logo.includes('Visual-1st.png') ? 'scale-[0.7]' :
                    item.logo && item.logo.includes('BEST-STARTUP') ? 'scale-[0.6]' :
                    ''
                  }`}
                  style={{
                    width: 'auto',
                    height: '80px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    objectPosition: 'top left',
                    display: 'block',
                    transformOrigin: 'top left',
                    ...(item.logo && item.logo.includes('product-hunt') ? {
                      marginTop: '-15px',
                      marginLeft: '-15px'
                    } : {})
                  }}
                  loading="lazy"
                  draggable="false"
                  decoding="async"
                />
              </div>
            )}
            
            <div className="flex-1 flex flex-col justify-center w-full">
              <h4 className={`font-semibold text-gray-900 mb-1 leading-tight ${
                item.isIntro ? 'text-sm uppercase tracking-wider text-gray-500 mb-3' : 'text-base md:text-lg'
              }`}>
                {item.title}
              </h4>
              <p className={`text-gray-500 leading-snug ${
                item.isIntro ? 'text-sm md:text-base' : 'text-xs md:text-sm'
              }`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}