import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");



// Internal Import
import {
    NFTMarketplaceAddress,
    NFTMarketplaceABI
} from "./constants";


// Fetching Smart Contract
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );


// Connecting With Smart Contract

const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with contract", error);
    }
};




export const NFTMarketplaceContext = React.createContext();


export const NFTMarketplaceProvider = (({ children }) => {
    const titleData = "Discover, collect, and sell NFTs";

    const [currentAccount, setCurrentAccount] = useState("");
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [accountBalance, setAccountBalance] = useState("");



    // Check if wallet is connected

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                setError("No Account Found");
                setOpenError(true);
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getBalance);
            setAccountBalance(bal);

            console.log(currentAccount);

        } catch (error) {
            setError("Something went wrong while connecting to wallet");
            setOpenError(true);
        }
    };


    useEffect(() => {
        checkIfWalletConnected();
    }, []);


    // Connect Wallet Function

    const connectWallet = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            setError("Error while connecting to wallet");
            setOpenError(true);
        }
    };


    // Upload to IPFS Function
    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return url;
        } catch (error) {
            setError("Error Uploading to IPFS");
            setOpenError(true);
        }
    };


    // Create NFT Function
    const createNFT = async (name, price, image, description, router) => {
        if (!name || !description || !price || !image)
            return setError("Data Is Missing"), setOpenError(true);

        const data = JSON.stringify({ name, description, image });

        try {
            const added = await client.add(data);

            const url = `https://ipfs.infura.io/ipfs/${added.path}`;

            await createSale(url, price);
            router.push("/searchPage");
        } catch (error) {
            setError("Error while creating NFT");
            setOpenError(true);
        }
    };



    //--- createSale Function
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            console.log(url, formInputPrice, isReselling, id);

            const price = ethers.utils.parseUnits(formInputPrice, "ether");

            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            setError("Error while creating sale");
            setOpenError(true);
            console.log(error);
        }
    };


    // Fetch NFTs Function

    const fetchNFTs = async () => {
        try {
            if (currentAccount) {
                const provider = new ethers.providers.JsonRpcProvider();
                console.log(provider);
                const contract = fetchContract(provider);

                const data = await contract.fetchMarketItem();

                const items = await Promise.all(
                    data.map(
                        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                            const tokenURI = await contract.tokenURI(tokenId);

                            const {
                                data: { image, name, description },
                            } = await axios.get(tokenURI);
                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI
                            };
                        }
                    )
                );

                console.log(items);
                return items;
            }
        } catch (error) {
            setError("Error while fetching NFTs");
            setOpenError(true);
            console.log(error);
        }
    };



    // Fetching my NFT or listed NFTs

    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            if (currentAccount) {
                const contract = await connectingWithSmartContract();

                const data =
                    type == "fetchItemsListed"
                        ? await contract.fetchItemsListed()
                        : await contract.fetchMyNFTs();

                const items = await Promise.all(
                    data.map(
                        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                            const tokenURI = await contract.tokenURI(tokenId);
                            const {
                                data: { image, name, description },
                            } = await axios.get(tokenURI);
                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI
                            };
                        }
                    )
                );
                return items;
            }
        } catch (error) {
            setError("Error while fetching listed NFTs");
            setOpenError(true);
        }
    };



    // Buy NFTs Function

    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price
            });

            await transaction.wait();
            router.push("/author");
        } catch (error) {
            setError("Error While buying NFT");
            setOpenError(true);
        }
    };



    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount,
                titleData
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )

})