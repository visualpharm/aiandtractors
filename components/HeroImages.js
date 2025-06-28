import Image from 'next/image';

export default function HeroImages({ 
  beforeImage, 
  afterImage, 
  beforeAlt, 
  afterAlt, 
  beforeCaption, 
  afterCaption,
  beforeBadge,
  afterBadge 
}) {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] my-2 h-[60vh] overflow-visible" style={{ transform: 'translateY(-25px)' }}>
      <div className="relative w-full h-full">
        <div className="relative h-[60vh]">
          {/* First image - slightly overlapping from left */}
          <a 
            href={beforeImage}
            data-fancybox="hero-gallery" 
            data-caption={beforeCaption}
            className="absolute left-[1%] top-[20%] w-[52%] h-[70%] rounded-xl overflow-hidden shadow-2xl transform -rotate-[7deg] z-30 bg-white p-4 cursor-pointer hover:shadow-3xl transition-shadow block"
          >
            <div className="relative w-full h-full">
              <Image 
                src={beforeImage}
                alt={beforeAlt}
                fill
                className="object-contain"
                sizes="50vw"
                priority
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </a>
          
          {/* Second image - slightly overlapping from right */}
          <a 
            href={afterImage}
            data-fancybox="hero-gallery" 
            data-caption={afterCaption}
            className="absolute right-[1%] bottom-[5%] w-[52%] h-[70%] rounded-xl overflow-hidden shadow-2xl transform rotate-[4deg] z-20 bg-white p-4 cursor-pointer hover:shadow-3xl transition-shadow block"
          >
            <div className="relative w-full h-full">
              <Image 
                src={afterImage}
                alt={afterAlt}
                fill
                className="object-contain"
                sizes="50vw"
                priority
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}