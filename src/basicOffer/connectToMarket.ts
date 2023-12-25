import {  Mangrove, Market, Token } from "@mangrovedao/mangrove.js";


async function connectToMarket(mangrove: Mangrove, base: Token, quote: Token, ticketSpacing: number): Promise<Market> {
    const market = await mangrove.market({ base, quote, tickSpacing: 1 });
    if (market.isActive() == false) {
      throw new Error(
        `Selected market is not active. \nbase Token:  ${JSON.stringify(base)} \n Quote: ${JSON.stringify(
          quote
        )}\nTicketSpacing: ${ticketSpacing}`
      );
    }
    return market;
  }
  
export default connectToMarket;