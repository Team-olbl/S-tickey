/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { contractABI } from './Abi';
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

let web3 : any = null;
let contract: any = null;
let account: any = [];

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

// 메타마스크 연결
const requestAccount = async () => {
  account = await window.ethereum?.request({ method: 'eth_requestAccounts' });
  web3.eth.handleRevert = true
}

// 지갑 조회
export const getWalletInfo = async () => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const balance = await web3?.eth.getBalance(account[0]);
    const dream = await getReword();
    const etherValue = web3?.utils.fromWei(balance, 'ether');

    const data = { address: account[0], balance: etherValue, dream: dream.toString() }
    return data;
  } catch (err) {
    alert("지갑 조회 실패");
  }
}

// 티켓 예매
export const createTicket = async (number : number, gameId : number, stadiumId : number, zoneId : number, seatNumber : number[], price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  console.log(number, gameId, stadiumId, zoneId, seatNumber, price);

  const value = price * 500000 * number;
  try {
    const ret = await contract.methods.createTicket(number, gameId, stadiumId, zoneId, seatNumber).send({ from: account[0], value: value, gasPrice : 3000000});
    return ret;
  } catch (err) {
    console.log(err);
    alert("티켓 예매 실패");
  }
}

// 티켓 환불
export const refundTicket = async (tokenId: number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.refundTicket(tokenId).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("환불 실패");
  }
}

// 내 티켓 조회
export const getTickets = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getTickets(account[0]).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
    alert("티켓 조회 실패");
  }
}

// 후원글 등록
export const setSupport = async (id : number, name : string, address : string, endTime : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setSupport(id, name, address, endTime).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("후원글 등록 실패");
  }
}

// 후원 글에 대한 후원
export const donate = async (id : number, text : string, value : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.donate(id, text).send({from : account[0], value : value, gasPrice : 3000000})
    return ret;
  } catch (err) {
    console.log(err);
    alert("후원 실패");
  }
}

// 내가 적은 후원 글에 대한 후원금 수령
export const withdraw = async(id : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.withdraw(id).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("수령 실패");
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
    alert("후원받은 내역 조회 실패");
  }
}

// 내가 후원한 내역 조회
export const getSupprtingHistory = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getSupprtingHistory(account[0]).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
    alert("후원한 내역 조회 실패");
  }
}

// 결제 이력 조회
export const getPaymentHistory = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getPaymentHistory(account[0]).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
    alert("결제 이력 조회 실패");
  }
}

// 꿈 증감 내역
export const getRewordHistory = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getRewordHistory(account[0]).call();
    return [...ret].reverse();
  } catch (err) {
    console.log(err);
    alert("꿈 내역 조회 실패");
  }
}

// 꿈 잔액 조회
export const getReword = async () => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getReword(account[0]).call();
    return ret;
  } catch (err) {
    console.log(err);
    alert("꿈 잔액 조회 실패");
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
    alert("아이템 조회 실패");
  }
}

// 티켓에 필터 적용
export const setFilterOnTicket = async (tokenId : number, itemId : number, supportId : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setFilterOnTicket(tokenId, itemId, supportId).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
  }
}


// 필터 아이템 추가
export const addFilter = async (name : string, price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.addFilter(name, price).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("필터 등록 실패");
  }
}

// 필터 아이템 삭제
export const deleteFilter = async (id : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.deleteFilter(id).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
  }
}

// 티켓에 배경색 적용
export const setBackgroundOnTicket = async (tokenId : number, itemId : number, supportId : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setBackgroundOnTicket(tokenId, itemId, supportId).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
  }
}

// 배경색 아이템 추가
export const addBackground = async (name : string, price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.addBackground(name, price).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
  }
}

// 배경색 아이템 삭제
export const deleteBackground = async (id : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.deleteBackground(id).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
  }
}

// 블록체인에 경기 정보 등록
export const setGame = async (id : number, bookStartTime : number, gameStartTime : number, stadium : string, homeTeam : string, awayTeam : string, category : string, gameImage : string) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const cate = category === "SOCCER" ? 0 : category === "BASEBALL" ? 1 : 2;
    console.log(id, bookStartTime, gameStartTime, stadium, homeTeam, awayTeam, cate, gameImage);
    const ret = await contract.methods.setGame(id, bookStartTime, gameStartTime, stadium, homeTeam,awayTeam, cate, gameImage).send({ from: account[0] , gasPrice : 3000000});
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
  }
}

// 좌석 가격 설정
export const setSeatPrice = async (stadiumId : number, zoneId : number, price : number) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setSeatPrice(stadiumId, zoneId, price).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
  }
}

// 구역 이름 설정
export const setZoneName = async (zoneId : number, zoneName : string) => {
  await connect();
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.setZoneName(zoneId, zoneName).send({ from: account[0], gasPrice : 3000000 });
    return ret;
  } catch (err) {
    console.log(err);
    alert("실패");
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
    alert("실패");
  }
}
