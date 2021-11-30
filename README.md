# blockchain-bootcamp-final-project
## Commission free hotel listing and booking dapp.

## Deployed dapp at:
https://paltryarrow7897-blockchain-bootcamp-project.netlify.app/

## Description:
Hotels could be the listed on the dapp for a small registration fee. Visitors could book rooms on any listed hotels and pay directly and avoid any third party charges.
The dapp integrates Chainlink Oracle for USD/ETH Price Feeds. 

Known Limitations:
1) The dapp assumes that only one type of rooms is available at any hotel. 
2) Visitors have to execute a transaction to mark their trip completed.
3) As soon as a user books a room, the room is unavailable to book even if the user has to visit at a later date.
4) No knowledge if the registering hotel is real or a scam.

Working Functions:
1) Register Hotel: anyone with an ethereum wallet could list their hotels on the dapp. Registration fee is owner defined, to be changed after Governance.
2) Book Hotel: visitors choose their hotels, enter number of rooms, from and to dates for their stay and pay. 
3) Checkout: let a visitor mark a visit completed.
4) Cancel Booking: refunds may be applicable if visitors cancel their booking in a certain period. Refund Percentage and Period owner defined, to be changed after Governance.

## Future Plans:
1) Chainlink Keepers to make hotel registration as quarterly renewal service instead of a one time payment.
2) Chainlink Keepers to automatically mark visit as completed after the booking duration ends.
3) Compound or any other DeFi integration to provide liquidity and earn interests on taken registration fee.
4) Add Governance.

## Ethereum Address for certification:
0x74f5395D628d86C8f7581d1A490dFafFE931de8E

## Directory structure:
1) client: Frontend: Built with plain HTML/CSS/JS.
2) contracts: Smart Contract: Solidity.
3) migrations: Migrations.
4) test: Truffle tests.

## Deploying on Kovan:
Because of Chainlink Aggregator dependency, the dapp can not be deployed locally. It needs to be deployed at Kovan testnet.

## Steps to deploy and test: 
This will need Kovan ETH in 3 wallets - defaultWallet for deploying, 1 as hotelWallet and 1 as visitorWallet.
If fails, try networkCheckTimeout: 1000000 in truffle-config.js.
1) git clone 
2) npm install
3) truffle console --network kovan
4) test

## .env variables:
Store 12 word mnemonic and websocket. https did not work with Kovan for me.
1) MNEMONIC="..."
2) INFURA_URL="wss://kovan.infura.io/ws/v3/..."

## Screencast link
https://www.loom.com/share/b6bc6f194b944a799d99c7d8961dec82


Note: Hugely inspired by https://github.com/jsur/blockchain-developer-bootcamp-final-project

Note to self and everyone else: I know it's not the best work but to me, I've surpassed my expectations. It still needs a lot of work but I'm glad I got to learn and make something at this bootcamp. Glad I joined. Thanks everyone at Consensys and people on Discord.
