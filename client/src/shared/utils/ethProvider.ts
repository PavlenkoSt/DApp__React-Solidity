import { ethers } from "ethers";

export const ethProvider = window.ethereum
  ? new ethers.BrowserProvider(window.ethereum)
  : null;
