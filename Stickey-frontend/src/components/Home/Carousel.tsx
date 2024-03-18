import { useState, useEffect } from "react";

const IMAGE_1_URL = 'src/assets/Carousel/KakaoTalk_20231218_163516051_01.gif';
const IMAGE_2_URL = 'src/assets/Carousel/KakaoTalk_20231218_163516051_02.gif';
const IMAGE_3_URL = 'src/assets/Carousel/KakaoTalk_20231218_163516051_03.gif';
const IMAGE_4_URL = 'src/assets/Carousel/KakaoTalk_20231218_163516051.gif';

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1);

  const images = [
    IMAGE_1_URL,
    IMAGE_2_URL,
    IMAGE_3_URL,
    IMAGE_4_URL
  ];

  // const handlePrev = () => {
  //   setActiveImage(activeImage === 1 ? images.length : activeImage - 1);
  // };

  // const handleNext = () => {
  //   setActiveImage(activeImage === images.length ? 1 : activeImage + 1);
  // };

  // 3.5초 간격으로 캐러셀 다음 index로 이동함
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(activeImage === images.length ? 1 : activeImage + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeImage, images.length]);

  return (
    <div className="relative pt-[10px] m-auto max-w-[300px] overflow-hidden rounded-[10px]">
    <div className="w-[300px] h-[300px] overflow-hidden ">
        {images.map((image, index) => (
          <div key={index} className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${activeImage === index + 1 ? 'opacity-100' : 'opacity-0'}`}>
            <img className="object-cover w-full h-full rounded-[10px]" src={image} />
          </div>
        ))}
        {/* 화살표 넣을지 말지...? */}
        {/* <button className="scale-[2] mx-[10px] absolute top-1/2 left-0 transform -translate-y-1/2 text-white" onClick={handlePrev}>&lsaquo;</button>
        <button className="scale-[2] mx-[10px] absolute top-1/2 right-0 transform -translate-y-1/2 text-white" onClick={handleNext}>&rsaquo;</button> */}
      </div>
      <div className="absolute bottom-4 w-full text-center">
        <button className="w-[268px] h-[44px] text-white border-[#2CDCB2] font-bold tracking-wider bg-[#2CDCB2] rounded-[10px] inline-block">
          <p className="text-center p-2 ">예매하기</p>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
