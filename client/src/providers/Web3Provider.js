import Web3 from "web3";
import nfusefactoryContractDetails from "../artifacts/nfusefactory.js";

let web3;

export const loginWithMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        window.ethereum.on("accountsChanged", function (accounts) {
            console.log(accounts);
        });

        web3 = new Web3(window.ethereum);
        web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];

        return accounts[0];
    }
}

export const checkLoggedInStatus = async () => {
    if (typeof window.ethereum !== "undefined") {

        window.ethereum.on("accountsChanged", function (accounts) {
            console.log(accounts);
        });

        web3 = new Web3(window.ethereum);
        web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
        try {
            let accounts = await web3.eth.getAccounts();
            if (accounts.length == 0) {
                return null;
            }
            else {
                return accounts[0];
            }
        }
        catch {
            return null;
        }
    }
    else {
        web3 = new Web3(window.ethereum);
        web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
        return web3.eth.defaultAccount;
    }
}

export const createCollectionContract = async (name, symbol, mintPrice) => {
    if (web3) {
        let mintPriceEth = web3.utils.toWei(mintPrice, 'ether');
        console.log(web3.eth.defaultAccount, name, symbol, mintPrice, mintPriceEth);

        let contract = new web3.eth.Contract(nfusefactoryContractDetails.abi, nfusefactoryContractDetails.address);
        let res = await contract.methods.createCollection(name, symbol, mintPriceEth).send({ from: web3.eth.defaultAccount, value: 0 });

        return res;
    }
    else {
        alert("Looks like you're not logged in :( Please log in with MetaMask");
    }
}

export const getEvents = async () => {
    if (web3) {
        let contract = new web3.eth.Contract(nfusefactoryContractDetails.abi, nfusefactoryContractDetails.address);
        let events = await contract.getPastEvents("CollectionCreation");

        return events.slice(-1)[0];
    }
    else {
        alert("Looks like you're not logged in :( Please log in with MetaMask");
    }
}