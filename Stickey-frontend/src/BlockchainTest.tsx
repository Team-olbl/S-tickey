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
    <div className="text-red-500">
      <div>블록체인 테스트 화면입니다.</div>
      <div onClick={_connect}>메타마스크 지갑연결  버튼</div>
      <div onClick={_getWalletInfo}>지갑 정보 확인</div>
    </div>
  </>

}

export default BlockchainTest;