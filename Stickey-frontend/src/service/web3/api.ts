/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { contractABI } from './Abi';
import { toast } from "react-toastify";
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

let web3 : any = null;
let contract: any = null;
let account: any = [];
let accountPending: boolean = false;

declare global {
  interface Window {
    ethereum: any;
  }
}

// to Ether
export const toEther = (value : bigint | number) => {
  return web3?.utils.fromWei(value, 'ether');
}

// 지갑 연결
export const connect = async () => {
  if (!window.ethereum) {
    toast.warn("메타마스크를 설치하세요.");
    return;
  } 
  
  web3 = new Web3(window.ethereum);
  if (accountPending) {
    toast.info("계정 요청이 이미 진행 중입니다. 잠금을 풀어주세요.");
  }  else {
    account = await requestAccount();
    contract = new web3.eth.Contract(contractABI, contractAddress);
    return !!account
  }
} 

// 메타마스크 연결
const requestAccount = async () => {
  try {
    accountPending = true;
    const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0)
      return accounts[0];
    return [];
  } catch (err) {
    console.log("메타마스크 연결에 실패했습니다.")
  } finally {
    accountPending = false;
  }
}

// 지갑 조회
export const getWalletInfo = async () => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const balance = await web3?.eth.getBalance(account);
    const dream = await getReword();
    const etherValue = web3?.utils.fromWei(balance, 'ether');

    const data = { address: account, balance: etherValue, dream: dream.toString() }
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getBalance = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  return await web3?.eth.getBalance(account);
}

// 티켓 예매
export const createTicket = async (number : number, gameId : number, stadiumId : number, zoneId : number, seatNumber : number[], price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  const value = price * 10e10 * number;
  try {
    const ret = await contract.methods.createTicket(number, gameId, stadiumId, zoneId, seatNumber).send({ from: account, value: value, gasPrice : 3000000});
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 티켓 환불
export const refundTicket = async (tokenId: number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.refundTicket(tokenId).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 내 티켓 조회
export const getTickets = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getTickets(account).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
  }
}

// 후원글 등록
export const setSupport = async (id : number, name : string, endTime : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setSupport(id, name, account, endTime).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 후원 글에 대한 후원
export const donate = async (id : number, text : string, value : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.donate(id, text).send({from : account, value : value, gasPrice : 3000000})
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 내가 적은 후원 글에 대한 후원금 수령
export const withdraw = async(id : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.withdraw(id).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 후원글이 후원 받은 내역 조회
export const getSupprtedHistory = async (id : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getSupprtedHistory(id).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
  }
}

// 내가 후원한 내역 조회
export const getSupprtingHistory = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getSupprtingHistory(account).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
  }
}

// 결제 이력 조회
export const getPaymentHistory = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getPaymentHistory(account).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
  }
}

// 꿈 증감 내역
export const getRewordHistory = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getRewordHistory(account).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
  }
}

// 꿈 잔액 조회
export const getReword = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getReword(account).call();
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 아이템 조회
export const getItemList = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getItemList().call();
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 티켓에 필터 적용
export const setFilterOnTicket = async (tokenId : number, itemId : number, supportId : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setFilterOnTicket(tokenId, itemId, supportId).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}


// 필터 아이템 추가
export const addFilter = async (id : number, price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.addFilter(id, price).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 필터 아이템 삭제
export const deleteFilter = async (id : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.deleteFilter(id).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 티켓에 배경색 적용
export const setBackgroundOnTicket = async (tokenId : number, itemId : number, supportId : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setBackgroundOnTicket(tokenId, itemId, supportId).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 배경색 아이템 추가
export const addBackground = async (id : number, price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.addBackground(id, price).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 배경색 아이템 삭제
export const deleteBackground = async (id : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.deleteBackground(id).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 블록체인에 경기 정보 등록
export const setGame = async (id : number, bookStartTime : number, gameStartTime : number, stadium : string, homeTeam : string, awayTeam : string, category : string, gameImage : string) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const cate = category === "SOCCER" ? 0 : category === "BASEBALL" ? 1 : 2;
    const ret = await contract.methods.setGame(id, bookStartTime, gameStartTime, stadium, homeTeam,awayTeam, cate, gameImage).send({ from: account , gasPrice : 3000000});
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 좌석 가격 설정
export const setSeatPrice = async (stadiumId : number, zoneId : number, price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setSeatPrice(stadiumId, zoneId, price).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 구역 이름 설정
export const setZoneName = async (zoneId : number, zoneName : string) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setZoneName(zoneId, zoneName).send({ from: account, gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
  }
}

// 좌석 상태 조회
export const getSeatState = async (gameId : number, zoneId : number, seatNumber : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getSeatState(gameId, zoneId, seatNumber).call();
    return ret;
  } catch (err) {
    console.log(err);
  }
}
