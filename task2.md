# How a market order works in SDK 
In my understanding, an Order is an action to buy or sell that the market either executes or fails without storing it for others to view. On the other hand, an Offer is a commitment to buy or sell in the market, remaining active until matched in the order book. 

The life cycle of an Offer is detailed in the [Executing Offers](https://docs.mangrove.exchange/developers/contracts/technical-references/taking-and-making-offers/reactive-offer/executing-offers/) page of the documentation. Next, I will explain how the order life cycle operates.

There is two type of order:
1. restingOrder
2. marketOrder
Mangrove can find the order type by input params in one of following way:
1. force it to use restingOrder 
2. use `fillOrKill` as true
3. use `restingOrderParams` in param

After Order function found the type of order try to create a TX and connect to Mangrove Contract and then if response was ok then start to trigger an event and make response.



## Market Order

(from code doc)A market order specifies a (`outbound`, `inbound`,`tickSpacing`) offer list, a limit price it is ready to pay (in the form of `maxTick`, the log base 1.0001 of the price), and a volume `fillVolume`. If `fillWants` is true, that volume is the amount of `olKey.outbound_tkn` the taker wants to buy. If `fillWants` is false, that volume is the amount of `olKey.inbound_tkn` the taker wants to sell.
  
It returns four `uint`s: the total amount of `olKey.outbound_tkn` received, the total amount of `olKey.inbound_tkn` spent, the penalty received by msg.sender (in wei), and the fee paid by the taker (in wei of `olKey.outbound_tkn`).


The market order stops when the price exceeds (an approximation of) 1.0001^`maxTick`, or when the end of the book has been reached, or:

- If `fillWants` is true, the market order stops when `fillVolume` units of `olKey.outbound_tkn` have been obtained. To buy a specific volume of `olKey.outbound_tkn` at any price, set `fillWants` to true, set `fillVolume` to volume you want to buy, and set `maxTick` to the `MAX_TICK` constant.
- If `fillWants` is false, the market order stops when `fillVolume` units of `olKey.inbound_tkn` have been paid. To sell a specific volume of `olKey.inbound_tkn` at any price, set `fillWants` to false, set `fillVolume` to the volume you want to sell, and set `maxTick` to the `MAX_TICK` constant.

if order type is `buy` then `outbound_tkn`` will be `market.base` and `inbound_tkn` will be market.quote

For a maximum `fillVolume` and a maximum (when `fillWants=true`) or minimum (when `fillWants=false`) price, the taker can end up receiving a volume of about `2**255` tokens. */

- If `orderType` is `"buy"`, the base/quote market will be used,
- If `orderType` is `"sell"`, the quote/base market will be used,
- `fillWants` defines whether the market order stops immediately once `wants` tokens have been purchased or whether it tries to keep going until `gives` tokens have been spent.
- In addition, `slippage` defines an allowed slippage in % of the amount of quote token.

## Buy and sell parameters
The volume of base token to buy or sell, and the limit price to accept.
```
    { volume: Bigish; limitPrice: Bigish }
```

the total amount of quote token to spend or receive, and the limit price to accept.
```
    { total: Bigish; limitPrice: Bigish }
```

the maximum tick to accept, the volume of token to buy (if `fillWants=true`), or sell (if `fillWants=false`, and a boolean indicating whether to try to get all the tokens that the taker wants (`fillWants=true`), or, to sell all the token the taker gives (`fillWants=false`).
```
    {
        maxTick: number;
        fillVolume: Bigish;
        fillWants?: boolean;
    }
```

the amount of token to sell, the amount of token to buy, and a boolean indicating whether to try to get all the tokens that the taker wants (`fillWants=true`), or, to sell all the token the taker gives (`fillWants=false`).
```
    { gives: Bigish; wants: Bigish; fillWants?: boolean }
```

# Improvement suggestion 