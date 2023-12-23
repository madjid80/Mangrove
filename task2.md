# How a market order works in SDK 
In my understanding, an Order is an action to buy or sell that the market either executes or fails without storing it for others to view. On the other hand, an Offer is a commitment to buy or sell in the market, remaining active until matched in the order book. 

The life cycle of an Offer is detailed in the (Executing Offers)[https://docs.mangrove.exchange/developers/contracts/technical-references/taking-and-making-offers/reactive-offer/executing-offers/] page of the documentation. Next, I will explain how the order life cycle operates.

1. 
2. 
3. 
4.
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