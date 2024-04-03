import { useEffect, useState } from 'react';

const GetTime = ({ createQR }: { createQR: () => void }) => {
  const [count, setCount] = useState<number>(15);

  const reloadQR = () => {
    setCount(15);
    createQR();
  };
  useEffect(() => {
    const interval = setInterval(() => setCount(count - 1), 1000);

    if (count <= 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [count]);
  return (
    <div>
      <span className="flex justify-center items-center">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <span className="text-sm px-1 text-center text-red-700 font-bold">남은 시간 {count}초</span>
      </span>
      <p className="text-center mt-2" onClick={reloadQR}>
        <button className="bg-ttokGray rounded-md text-white bg-black p-1">
          <div className="flex items-center text-center px-1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </span>
            <span className="pl-1 text-sm">새로고침</span>
          </div>
        </button>
      </p>
    </div>
  );
};

export default GetTime;
