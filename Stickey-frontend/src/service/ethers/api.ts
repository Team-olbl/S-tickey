/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { contractABI } from './Abi';
const contractAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS;

let web3 : any = null;
let contract: any = null;
let account : any = [] ;

declare global {
  interface Window {
    ethereum: any;
  }
}

const requestAccount = async () => {
  account = await window.ethereum?.request({ method: 'eth_requestAccounts' });
  console.log("account", account);
}

// 지갑 연결
// 처음 연결할때 사용
export const connect = async () => {
  if (!window.ethereum) {
    alert("메타마스크를 설치하세요.");
    return;
  } 
  
  web3 = new Web3(window.ethereum);
  try {
    await requestAccount();
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } catch (err) {
    console.log(err);
  }
} 

/** 
 * 지갑 정보 확인 API
 * 
 * @return { address: 지갑주소, balance : 지갑 내 이더리움 잔액, dream : 꿈 잔액 }
 */
export const getWalletInfo = async () => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  const balance = await web3?.eth.getBalance(account[0]);
  const dream = await contract.methods.getReword(account[0]).call();
  const etherValue = web3?.utils.fromWei(balance, 'ether');

  const data = { address: account[0], balance : etherValue, dream : dream.toString()}
  return data;
}


/**
 * 티켓 예매 API
 * 
 * @param number 티켓 매수 (좌석 선택 수)
 * @param gameId 경기 ID
 * @param stadium 경기장 이름
 * @param zoneName 구역 이름
 * @param seatNumber 선택한 좌석번호들
 * @return Transaction Hash 
 */
export const createTicket = async (number : number, gameId : number, stadium : stirng, zoneName : string, seatNumber : number[]) => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  const ret = await contract.methods.createTicket(number, gameId, stadium, zoneName, seatNumber).send({ from: account[0] });

  return ret;
}
