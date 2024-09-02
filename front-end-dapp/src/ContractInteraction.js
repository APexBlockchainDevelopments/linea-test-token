import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ContractIntegration = () => { 
    const [ethAmount, setEthAmount] = useState("");
    const [newAdmin, setNewAdmin] = useState("");
    const [totalSupply, setTotalSupply] = useState("0");
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

    const contractAddress = "0x489DB986bf343e7A04BBdb2B82311FF51AD49DDE";
    const lineaSepoliaNetworkId = "59141"; 
    const abi = [
        "function mintTokensForUser() public payable",
        "function withdraw() external",
        "function updateAdminAddress(address payable _newAdmin) external",
        "function transfer(address to, uint256 amount) public returns (bool)",
        "function totalSupply() public view returns (uint256)"
    ];

    const checkNetwork = async () => {~
        if (!window.ethereum) {
            alert("MetaMask is required");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (chainId.toString() === lineaSepoliaNetworkId) {
            setIsCorrectNetwork(true);
        } else {
            alert("Please connect to the Linea Sepolia network.");
            setIsCorrectNetwork(false);
        }
    };

    const addTokenToMetaMask = async () => {
        try {
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: contractAddress,
                        symbol: 'LTT',
                        decimals: 18,
                        image: 'https://example.com/token-logo.png', // Optional token logo
                    },
                },
            });

            if (wasAdded) {
                alert('Linea Test Token (LTT) added to MetaMask!');
            } else {
                alert('Failed to add Linea Test Token (LTT) to MetaMask');
            }
        } catch (error) {
            console.error('Error adding token to MetaMask:', error);
        }
    };

    const fetchTotalSupply = async () => {
        if (!isCorrectNetwork) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        try {
            const supply = await contract.totalSupply();
            setTotalSupply(ethers.utils.formatEther(supply));
        } catch (error) {
            console.error(error);
            alert("Failed to fetch total supply");
        }
    };

    useEffect(() => {
        checkNetwork();
        fetchTotalSupply();
    }, [isCorrectNetwork]);

    const handleMint = async () => {
        if (!isCorrectNetwork) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const tx = await contract.mintTokensForUser({ value: ethers.utils.parseEther(ethAmount) });
            await tx.wait();
            alert("Tokens minted successfully!");
            fetchTotalSupply();  // Update the total supply after minting
        } catch (error) {
            console.error(error);
            alert("Minting failed!");
        }
    };

    const handleWithdraw = async () => {
        if (!isCorrectNetwork) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const tx = await contract.withdraw();
            await tx.wait();
            alert("Funds withdrawn successfully!");
        } catch (error) {
            console.error(error);
            alert("Withdrawal failed!");
        }
    };

    const handleUpdateAdmin = async () => {
        if (!isCorrectNetwork) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const tx = await contract.updateAdminAddress(newAdmin);
            await tx.wait();
            alert("Admin address updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Admin update failed!");
        }
    };

    return ( 
        <div>
            <h2>Linea Test Token dApp</h2>

            <div>
                <h3>Total Supply</h3>
                <p>{totalSupply} LTT</p>
            </div>

            <div>
                <h3>Mint Tokens</h3>
                <p>Send ETH in WEI to mint Linea Test Token (LTT) at a 1:1 ratio.</p>
                <input
                    type="text"
                    placeholder="Amount of ETH in WEI"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                />
                <button onClick={handleMint} disabled={!isCorrectNetwork}>Mint Tokens</button>
            </div>

            <div>
                <h3>Withdraw Funds</h3>
                <p>Withdraw all ETH collected by the contract. Only the contract owner can perform this action.</p>
                <button onClick={handleWithdraw} disabled={!isCorrectNetwork}>Withdraw All Ether</button>
            </div>

            <div>
                <h3>Update Admin Address</h3>
                <p>Update the admin address of the contract. This action can only be performed by the contract owner.</p>
                <input
                    type="text"
                    placeholder="New Admin Address"
                    value={newAdmin}
                    onChange={(e) => setNewAdmin(e.target.value)}
                />
                <button onClick={handleUpdateAdmin} disabled={!isCorrectNetwork}>Update Admin</button>
            </div>

            <div>
                <h3>MetaMask Features</h3>
                <button onClick={addTokenToMetaMask}>Add LTT to MetaMask</button>
            </div>
        </div>
    );
};

export default ContractIntegration;
