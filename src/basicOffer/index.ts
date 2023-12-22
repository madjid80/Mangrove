import { off } from "process";
import { LOCAL_URL, PRIVATE_KEY } from "../constants";
import { LiquidityProvider, Mangrove, Market, Token, ethers } from "@mangrovedao/mangrove.js";

async function initMangrove(providerUrl: string, privateKey: string): Promise<Mangrove> {
  if (providerUrl == null || privateKey == null) {
    throw new Error("providerUrl and privateKey need to be filled in env variable");
  }
  const provider = new ethers.providers.WebSocketProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  return Mangrove.connect({ signer: wallet });
}

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

async function findAnOpenMarket(mangrove: Mangrove): Promise<Mangrove.OpenMarketInfo> {
  const openMarkets: Mangrove.OpenMarketInfo[] = await mangrove.openMarkets({ maxLen: 100 });

  if (openMarkets.length > 0) {
    console.log(
      `Find an open market, base: ${openMarkets[0].base.symbol}` +
        `, quote:${openMarkets[0].quote.symbol} , ticketSpacing: ${openMarkets[0].tickSpacing}`
    );
    return openMarkets[0];
  }
  throw new Error("There is not any active open market rn.\nPlease try again later.");
}

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

async function buyOffer(
  mangrove: Mangrove,
  market: Market,
  wants: number,
  limitPrice: number
): Promise<Market.OrderResult> {
  await market.quote.contract.mintTo(process.env.ADMIN_ADDRESS ?? "", 10000, { gasLimit: 1000000 });

  //approve that the mangroveOrder contract can use your USDC (quote) funds
  const tx = await market.base.approve(mangrove.address, { amount: wants, overrides: {} });
  await tx.wait();
  const buyResult = await market.buy(
    {
      volume: wants,
      limitPrice: 1.3,
      fillOrKill: true,
    },
    { gasLimit: 1000000 }
  );
  return buyResult.result;
}
async function main() {
  //init mangrove
  const mangrove: Mangrove = await initMangrove(LOCAL_URL, PRIVATE_KEY);

  // find an open market
  const openMarketInfo: Mangrove.OpenMarketInfo = await findAnOpenMarket(mangrove);

  // connect to the market
  const activeMarket: Market = await connectToMarket(
    mangrove,
    openMarketInfo.base,
    openMarketInfo.quote,
    openMarketInfo.tickSpacing
  );

  // add offer
  const wants = 20;
  const gives = 40000;
  console.log(
    `Trying to add your offer as follow wants: ${wants}${openMarketInfo.base.symbol},` +
      ` gives: ${gives}${openMarketInfo.quote.symbol}`
  );

  const offerId: number = await addOffer(mangrove, activeMarket, wants, gives);
  console.log(`Offer added successfully and id is: ${offerId}`);

  //show offer
  activeMarket.consoleAsks();

  //request to buy
  const result = await buyOffer(mangrove, activeMarket, gives, 2);

  //show bids
  activeMarket.consoleAsks();
}

main();
