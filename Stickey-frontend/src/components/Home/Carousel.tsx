import { useState, useEffect } from 'react';
import Carousel2 from '../../assets/image/Carousel/Carousel2.png';
import Carousel3 from '../../assets/image/Carousel/Carousel4.png';
import Carousel4 from '../../assets/image/Carousel/Carousel3.png';

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1);

  const images = [Carousel2, Carousel3, Carousel4];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(activeImage === images.length ? 1 : activeImage + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeImage, images.length]);

  return (
    <div className="relative m-auto max-w-[500px]  w-full overflow-hidden rounded-[10px]">
      <div className="flex justify-center h-[300px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out px-4 ${activeImage === index + 1 ? 'opacity-100' : 'opacity-0'}`}
          >
            <img className="object-cover w-full h-full rounded-[10px]" src={image} alt={`Carousel ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
