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
            className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full p-5 md:p-7 border border-gray-100 text-left overflow-hidden ${
              item.isIntro ? 'lg:col-span-1' : ''
            } ${
              item.logo && item.logo.includes('product-hunt') ? 'relative z-10' : ''
            }`}
            style={{
              ...(item.logo && item.logo.includes('product-hunt') ? {
                boxShadow: `
                  0 8px 25px rgba(0,0,0,0.15),
                  0 0 0 1px rgba(255,255,255,0.8),
                  -1px 7px 0 0 #f1f5f9,
                  1px 14px 0 0 #e2e8f0,
                  -2px 21px 0 0 #d1d5db,
                  2px 28px 0 0 #c4c9d4,
                  -1px 35px 0 0 #b8bcc8,
                  1px 42px 0 0 #a8adb9
                `,
                transform: 'rotate(-0.5deg) translateY(-42px)'
              } : {})
            }}
            tabIndex={0}
            aria-label={`${item.title}, ${item.description}`}
          >
            {/* Corner stripe for Product Hunt card */}
            {item.logo && item.logo.includes('product-hunt') && (
              <div 
                className="absolute bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold py-1 px-16 transform rotate-45"
                style={{
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  top: '20px',
                  right: '-52px',
                  width: '200px',
                  textAlign: 'center',
                  fontSize: '18px',
                  whiteSpace: 'nowrap'
                }}
              >
                45 times
              </div>
            )}
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
                    item.logo && item.logo.includes('product-hunt') ? 'scale-[1.5]' : 
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
            
            <div className={`flex-1 flex flex-col justify-start w-full ${
              item.logo && item.logo.includes('product-hunt') ? 'mt-4' : ''
            }`}>
              <h4 className={`font-semibold text-gray-900 leading-tight mb-1.5 ${
                item.isIntro ? 'text-sm uppercase tracking-wider text-gray-500' : 'text-base md:text-lg'
              }`}>
                {item.title.includes('Award') ? (
                  <>
                    {item.title.replace(' Award', '')}
                    <br />
                    Award
                  </>
                ) : (
                  item.title
                )}
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