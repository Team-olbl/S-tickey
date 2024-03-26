/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { contractABI } from './Abi';
const contractAddress = "0x7C20b2c35Fb7aaF6f59166Aa50e3951db72a813b";

let web3 : any = null;
let contract: any = null;
let account : any = [] ;

declare global {
  interface Window {
    ethereum: any;
  }
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

const requestAccount = async () => {
  account = await window.ethereum?.request({ method: 'eth_requestAccounts' });
  web3.eth.handleRevert = true
}

export const getWalletInfo = async () => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const balance = await web3?.eth.getBalance(account[0]);
    const dream = await contract.methods.getReword(account[0]).call();
    const etherValue = web3?.utils.fromWei(balance, 'ether');

    const data = { address: account[0], balance: etherValue, dream: dream.toString() }
    return data;
  } catch (err) {
    alert("지갑 조회 실패");
  }
}

export const createTicket = async (number : number, gameId : number, stadiumId : number, zoneId : number, seatNumber : number[], price : number) => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  const value = price * number;
  try {
    const ret = await contract.methods.createTicket(number, gameId, stadiumId, zoneId, seatNumber).send({ from: account[0], value: value });
    return ret;
  } catch (err) {
    alert("티켓 예매 실패");
  }
}

export const refundTicket = async (tokenId: number) => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.refundTicket(tokenId).send({ from: account[0] });
    return ret;
  } catch (err) {
    alert("환불 실패");
  }
}

export const getTickets = async () => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  try {
    const ret = await contract.methods.getTickets(account[0]).call();

    const data = [];

    for (let i = ret.length - 1; i >= 0; i--) {
      data.push(
        {
          tokenId: ret[i].tokenId,
          gameId: ret[i].gameId,
          stadium: ret[i].stadium,
          seat: ret[i].zoneName + " " + ret[i].seatNumber,
          price: ret[i].price,
          filterId: ret[i].filterId,
          backgroundId: ret[i].backgroundId,
          category: ret[i].category == 0 ? "SOCCER" : ret[i].category == 1 ? "BASEBALL" : "BESKETBALL",
          homeTeam: ret[i].homeTeam,
          awayTeam: ret[i].awayTeam,
          gameImage: ret[i].gameImage
        }
      )
    }
    return data;
  } catch (err) {
    alert("티켓 조회 실패");
  }
}




