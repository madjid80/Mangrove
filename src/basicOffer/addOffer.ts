import { LiquidityProvider, Mangrove, Market } from "@mangrovedao/mangrove.js";


async function addOffer(mangrove: Mangrove, market: Market, wants: number, gives: number): Promise<number> {
    const liquidityProvider: LiquidityProvider = await mangrove.liquidityProvider(market);
  
    const tx = await market.base.approve(mangrove.address, { amount: gives, overrides: {} });
    await tx.wait();
  
    const provision = await liquidityProvider.computeAskProvision();
  
    const { id: offerId } = await liquidityProvider.newAsk({
      wants,
      gives,
      fund: provision,
    });
    return offerId;
  }

  export default addOffer;