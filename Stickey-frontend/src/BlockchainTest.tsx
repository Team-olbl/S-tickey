import { connect } from "./service/ethers/api";


const BlockchainTest = () => {

  const connectMatemask = () => {
    connect();
  }

  return <>
    <div className="text-red-500">
      <div>블록체인 테스트 화면입니다.</div>
      <button onClick={connectMatemask}>메타마스크 지갑연결  버튼</button>
    </div>
  </>

}

export default BlockchainTest;