import { ethers } from 'ethers';
import { contractABI } from './Abi';

let provider : ethers.BrowserProvider;
let signer : Promise<ethers.JsonRpcSigner>;

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export function useEthers() {
  return { provider, signer };
}


export async function requestAccount() {
  await window.ethereum?.request({ method: 'eth_requestAccounts' });
}

export async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = provider.getSigner();

    return { provider, signer };
  } else {
    alert("메타마스크를 설치해주세요");
  }
}