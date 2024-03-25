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

