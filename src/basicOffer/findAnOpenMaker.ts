import { Mangrove } from "@mangrovedao/mangrove.js";

async function findAnOpenMarket(mangrove: Mangrove): Promise<Mangrove.OpenMarketInfo> {
  const openMarkets: Mangrove.OpenMarketInfo[] = await mangrove.openMarkets({ maxLen: 100 });

  const openMarket: Mangrove.OpenMarketInfo | undefined = openMarkets.find(
    (info) => info.base.symbol == "USDT" && info.quote.symbol == "WMATIC"
  );

  if (openMarket) {
    console.log(
      `Find an open market, base: ${openMarket.base.symbol}` +
        `, quote:${openMarket.quote.symbol} , ticketSpacing: ${openMarket.tickSpacing}`
    );
    return openMarket;
  }
  throw new Error("There is not any active open market rn.\nPlease try again later.");
}

export default findAnOpenMarket;
