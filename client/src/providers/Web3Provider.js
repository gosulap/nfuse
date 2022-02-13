import Web3 from "web3";
import nfusefactoryContractDetails from "../artifacts/nfusefactory.js";

let web3;

export const loginWithMetaMask = async () => {
    console.log("loggin in ")
    if (typeof window.ethereum !== "undefined") {
        // need some error handling here
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
    } else {
        console.log("in else")
        web3 = new Web3(window.ethereum);
        web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
    }
}

export const createCollection = async (name, symbol, mintPrice) => {
    if (web3) {
        console.log(web3.eth.defaultAccount, name, symbol, mintPrice, parseInt(mintPrice))
        let contract = new web3.eth.Contract(nfusefactoryContractDetails.abi, nfusefactoryContractDetails.address);
        let res = await contract.methods.createCollection(name, symbol, parseInt(mintPrice)).send({ from: web3.eth.defaultAccount, value: 0 });;
        console.log(res);
    } else {
        alert("Looks like you're not logged in :( Please log in with MetaMask")
    }
}