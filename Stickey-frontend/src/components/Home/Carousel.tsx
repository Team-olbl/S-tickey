import { useState, useEffect } from "react";
import Carousel1 from '../../assets/image/Carousel/Carousel1.gif'
import Carousel2 from '../../assets/image/Carousel/Carousel2.gif'
import Carousel3 from '../../assets/image/Carousel/Carousel3.gif'
import Carousel4 from '../../assets/image/Carousel/Carousel4.gif'
import Carousel5 from '../../assets/image/Carousel/Carousel5.gif'

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(0); // 초기 값 0으로 설정

  const images = [
    Carousel1,
    Carousel2,
    Carousel3,
    Carousel4,
    Carousel5,
  ];

  // 3.5초 간격으로 캐러셀 다음 index로 이동함
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(activeImage === images.length  ? 0 : activeImage); // images 배열의 길이에서 1을 빼주어 마지막 이미지일 때 다시 처음으로 돌아가도록 설정
    }, 3500);

    return () => clearInterval(interval);
  }, [activeImage, images.length]);

  return (
    <div className="relative m-auto max-w-[500px]  w-full overflow-hidden rounded-[10px]">
      <div className="flex justify-center h-[300px] overflow-hidden">
          {images.map((image, index) => (
            <div key={index} className={`absolute w-full h-full transition-opacity duration-700 ease-in-out px-4 ${activeImage === index ? 'opacity-100' : 'opacity-0'}`}> {/* activeImage와 index를 비교하여 opacity를 조정 */}
              <img className="object-cover w-full h-full rounded-[10px]" src={image} alt={`Carousel ${index + 1}`} />
            </div>
          ))}
        
      </div>
      {/* <div className="absolute bottom-4 w-full text-center">
        <button className="w-[268px] h-[44px] text-white border-Sticky_GREEN font-bold tracking-wider bg-[#2CDCB2] rounded-[10px] inline-block">
          <p className="text-center p-2 ">예매하기</p>
        </button>
      </div> */}
    </div>
  );
}

export default Carousel;
