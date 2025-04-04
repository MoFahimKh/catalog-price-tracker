<h1 align="center">Welcome to Catalog ETH Price Tracker 👋</h1>

> A React TypeScript application to track the real-time price of Ethereum (ETH) in USD, connect to MetaMask wallet, display ETH balance in USD, and visualize ETH price trends with an interactive line graph.

## MetaMask & Network Setup

- Ensure MetaMask is installed. If not, download it from [MetaMask](https://metamask.io/).
- Switch your MetaMask network to `Sepolia Testnet` to use this application.
- The wallet balance is retrieved directly from the connected MetaMask wallet on Sepolia.

## Features

- **Wallet Connection**: Connect your MetaMask wallet using `ethers.js`.

  ![Wallet Connect](/src/assets/connect-wallet.png)

- **Real-time Balance**: Displays your wallet's ETH balance in USD with live updates.

  ![Real-time Balance](/src/assets/bal.png)

- **Price Change Tracking**: Shows real-time changes in ETH balance in USD with percentage change in price.

  ![Price Change Tracking](/src/assets/price-change.png)

- **Line Graph**: Visualize ETH price trends in USD over selected time periods:

  - 1 Day, 3 Days, 1 Month, 6 Months, and Max.

  ![Line Graph](/src/assets/line-graph.png)

- **Modern UI & Enhanced Design**: The UI has been improved based on Figma design refinements to enhance user experience, particularly in displaying the wallet balance directly from MetaMask on Sepolia.

## Installation

To set up the project locally:

```sh
pnpm install
```

## Usage

```sh
pnpm run dev
```

## Technologies Used

- **React**: For building the UI.
- **TypeScript**: Ensures type safety and scalability.
- **ethers.js**: To interact with the Ethereum blockchain and connect to MetaMask.
- **CoinGecko API**: Fetches real-time and historical ETH price data.
- **Chart.js**: For rendering the interactive line graph.

## Deployment link

Deployed using Netlify.

- [Catalog ETH Price Tracker]()

## Future Improvements

- **Line Graph Enhancements**:
  - Add an end legend to improve readability.
  - Change font style for crosshair end labels to enhance visibility.
- **Multi-Network Support**:
  - Enable support for multiple testnets and mainnets.
- **Dark Mode**:
  - Implement a dark mode option for better accessibility.

## Author

👨‍💻 **Mohammad Fahim Khan**

- GitHub: [@MoFahimKh](https://github.com/MoFahimKh)

## Note

Currently, for testing purposes, the network selected is `SepoliaETH` with ChainID: `11155111`.

Ensure that MetaMask is installed and switched to the `Sepolia Testnet` to use this application effectively.
