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

export const getWalletInfo = async () => {
  if (contract === null || web3 === null) throw new Error("Invalid Call");
  const balance = await web3?.eth.getBalance(account[0]);
  const dream = await contract.methods.getReword(account[0]).call();
  const etherValue = web3?.utils.fromWei(balance, 'ether');

  const data = { address: account[0], balance : etherValue, dream : dream.toString()}
  return data;
}
