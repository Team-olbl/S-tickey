import fingerPrint from '../../assets/image/fingerprint.png'

const Wallet = () => {
  
  return (
    <div>  
        {/* 지갑 활성화 전*/}
        <div className="flex justify-evenly items-center p-4 rounded-md border-Stickey_Gray border">
           <div className="flex flex-col items-center">
                <img className='w-10 py-2' src={fingerPrint} />
                <p className="text-xs text-Stickey_Main">지갑을 열어서 잔액을 확인해보세요</p>
            </div>
        </div>

        {/* 지갑 활성화 후 */}
        {/* <div className="flex justify-evenly items-center p-4 rounded-md border-Stickey_Gray border">
            <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 지갑</p>
                <p className="text-xl font-bold text-white py-1">89000</p>
            </div>
            <div className="text-Stickey_Gray">|</div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-Stickey_Main">나의 꿈</p>
                <p className="text-xl font-bold text-white py-1">12</p>
            </div>
        </div> */}
    </div>
    
  );
};

export default Wallet;
