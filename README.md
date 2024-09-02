# **Linea Test Token dApp**

## **Overview**
The Linea Test Token dApp is a decentralized application built on the Linea Sepolia network. It allows users to interact with the `Linea Test Token` smart contract by minting tokens, withdrawing funds, and updating the admin address. The dApp is built with React and integrates with MetaMask for seamless interaction with the blockchain.

## **Features**
- **Mint Tokens**: Users can send ETH in WEI to the contract, which will mint an equivalent amount of Linea Test Token (LTT) at a 1:1 ratio.
- **Withdraw Funds**: The contract owner can withdraw all ETH collected by the contract.
- **Update Admin Address**: The contract owner can update the admin address of the contract.
- **Total Supply Display**: The total supply of Linea Test Token (LTT) is displayed on the dApp, updating in real-time as tokens are minted.
- **Network Switching**: Users can easily switch to the Linea Sepolia network directly from the dApp.
- **Add Token to MetaMask**: Users can add the Linea Test Token (LTT) to their MetaMask wallet with a single click.


## **Prerequisites**
- **Node.js**: Make sure you have Node.js installed on your system.
- **MetaMask**: Install the MetaMask browser extension and connect it to the Linea Sepolia network.
- **Foundry**: Install the Foundry to write and deploy the smart contract.

## **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Linea Test Token-dapp.git  ***** Will need to update this
   cd Linea Test Token-dapp
   ```
2. **Install Front End Dependencies**: 
    ```bash
    mkdir FrontEnd
    npm install
    ```
3. **Install Smart Contract Dependencies**: 
    ```bash
    mkdir SmartContracts
    forge install
    ```
4. **Update Contract Address**:
    - Open Transfer.js and update the contractAddress variable with your deployed contract’s address.

5. **Run the dApp**:
    ```bash
    npm start
    ```
    The dApp will run on http://localhost:3000.
    
## **Usage**
1. Connect to MetaMask: Ensure MetaMask is connected to the Linea Sepolia network.
2. Mint Tokens: Enter the amount of ETH in WEI and click "Mint Tokens" to mint Linea Test Token (LTT).
3. Withdraw Funds: Click "Withdraw All Ether" to withdraw all ETH from the contract (only available to the contract owner).
4. Update Admin Address: Enter the new admin address and click "Update Admin" (only available to the contract owner).
5. View Total Supply: The total supply of Linea Test Token (LTT) is displayed on the homepage.
6. Add Token to MetaMask: Click "Add LTT to MetaMask" to add the Linea Test Token (LTT) to your MetaMask wallet.
   
## **Network Requirements**
This dApp is designed to work on the Linea Sepolia network. Please ensure you are connected to the correct network before interacting with the dApp.
## **Contributing**
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## **License**
This project is licensed under the MIT License. See the LICENSE file for details.