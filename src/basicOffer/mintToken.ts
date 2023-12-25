import { Market, Token } from "@mangrovedao/mangrove.js";
import { ADMIN_ADDRESS } from "../constants";

async function mintToken(to: string, market: Market, token: Token, amount: number): Promise<void> {
  let mintTransaction = await token.contract.mintTo(to, market.base.toUnits(amount), {
    gasLimit: 100000, //fix it
  });
  await mintTransaction.wait();
}

export default mintToken;