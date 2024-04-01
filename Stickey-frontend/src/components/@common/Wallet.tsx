
const Wallet = () => {
  

  return (
    <div className="flex justify-center">
        {/* 지갑 */}
        <div className="w-60 p-4 rounded-md bg-white">
            <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 지갑</p>
                <p className="text-2xl font-bold">89000</p>
            </div>
        </div>

        {/* 꿈 */}
        <div className="flex flex-col items-center w-40 p-4 rounded-md bg-white">
            <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 꿈</p>
                <p className="text-2xl font-bold">12</p>
            </div>
        </div>
    </div>
    
  );
};

export default Wallet;
