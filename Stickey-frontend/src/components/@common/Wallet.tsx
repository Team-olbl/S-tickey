
const Wallet = () => {
  
  return (
    <div>   
        <div className="flex justify-evenly items-center p-4 rounded-md border-Stickey_Gray border">
            {/* 지갑 */}
            <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 지갑</p>
                <p className="text-xl font-bold text-white py-1">89000</p>
            </div>
            <div className="text-Stickey_Gray">|</div>
             {/* 꿈 */}
            <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 꿈</p>
                <p className="text-xl font-bold text-white py-1">12</p>
            </div>
        </div>
    </div>
    
  );
};

export default Wallet;
