import { useEffect } from "react";
import { connect, getWalletInfo } from './service/ethers/api'

const BlockchainTest = () => {

  useEffect(() => {
    connect();
  }, []);

  const _connect = () => {
    connect();
  }

  const _getWalletInfo = async () => {
    const result = await getWalletInfo();
    console.log(result);
  }

  return <>
    <div className="text-slate-300 flex flex-col items-center">
      <div>블록체인 테스트 화면입니다.</div>

      <div className="text-center bg-amber-600">
        <div className="text-[5vw]">지갑 관련 API</div>
        <div className="flex gap-5">
        <button type="button" onClick={_connect} >
          메타마스크 지갑연결 
          </button>
          <button type="button" onClick={_getWalletInfo} >
          지갑 정보 확인
          </button>
        </div>
      </div>
    </div>
  </>

}

export default BlockchainTest;