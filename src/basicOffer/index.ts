import {  ADMIN_ADDRESS, LOCAL_URL, PRIVATE_KEY } from "../constants";
import {  Mangrove, Market } from "@mangrovedao/mangrove.js";
import initMangrove from "./init";
import findAnOpenMarket from "./findAnOpenMaker";
import connectToMarket from "./connectToMarket";
import addOffer from "./addOffer";
import mintToken from "./mintToken";
import buyOffer from "./buy";


async function main() {
  const mangrove: Mangrove = await initMangrove(LOCAL_URL, PRIVATE_KEY);
  const openMarketInfo: Mangrove.OpenMarketInfo = await findAnOpenMarket(mangrove);
  const activeMarket: Market = await connectToMarket(
    mangrove,
    openMarketInfo.base,
    openMarketInfo.quote,
    openMarketInfo.tickSpacing
  );
  
  const wants = 20; //rand
  const gives = 40000; //rand
  console.log(
    `Trying to add your offer as follow wants: ${wants}${openMarketInfo.base.symbol},` +
      ` gives: ${gives}${openMarketInfo.quote.symbol}`
  );

  //seller
  await mintToken(ADMIN_ADDRESS, activeMarket, openMarketInfo.base, gives);
  const offerId: number = await addOffer(mangrove, activeMarket, wants, gives);
  console.log(`Offer added successfully and id is: ${offerId}`);
  activeMarket.consoleAsks();

  //buyer side
  await mintToken(ADMIN_ADDRESS, activeMarket, openMarketInfo.quote, wants);
  const result = await buyOffer(mangrove, activeMarket, wants, Math.ceil(wants/gives));
  console.log(result?.summary);
  activeMarket.consoleAsks();
}

main();
