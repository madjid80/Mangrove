import { Mangrove, Market } from "@mangrovedao/mangrove.js";

async function buyOffer(
    mangrove: Mangrove,
    market: Market,
    wants: number,
    limitPrice: number
  ): Promise<Market.OrderResult | null> {
    
    const tx = await market.quote.approve(mangrove.address, { amount:wants, overrides: {} });
    await tx.wait();
    const buyResult = await market.buy(
      {
        volume: wants,
        limitPrice,
        
      },
      { gasLimit: 1000000 }
    );
    return buyResult.result;
  }

  export default buyOffer;