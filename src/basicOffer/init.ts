import {  Mangrove, ethers } from "@mangrovedao/mangrove.js";

async function initMangrove(providerUrl: string, privateKey: string): Promise<Mangrove> {
    if (providerUrl == null || privateKey == null) {
      throw new Error("providerUrl and privateKey need to be filled in env variable");
    }
    const provider = new ethers.providers.WebSocketProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
  
    return Mangrove.connect({ signer: wallet });
  }

  export default initMangrove;