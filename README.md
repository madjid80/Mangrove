# Mangrove SDK Technical Task

## Intro

Name: Majid Lashgarian

LinkedIn: [Majid Lashgarian](https://www.linkedin.com/in/majidlashgarian)

Email: madjid.80@gmail.com

## Prepare

1. Install Node.js (v18+):

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```

2. Install Foundry:

    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    # Reopen shell
    foundryup
    ```

3. Run anvil for a local Ethereum node:

    ```bash
    anvil --fork-url
    ```

## Install

Run `npm i` to install dependencies.


## Env
create `.env` file
```bash
cp .env.example .env
```
Fill env file with proper value

```bash
export PRIVATE_KEY= # The first anvil private key
export ADMIN_ADDRESS= # The matching public key, to the first anvil private key
export RPC_URL= # Demo RPC provided by alchemy
export LOCAL_URL=http://127.0.0.1:8545 # Url for the local chan that anvil starts
```

## Build

Compile the code with `npm build`.

## Run

Execute `npm run basicOffer` to run the application.
