const fs = require("fs");
const { ethers } = require("hardhat");
const { networkConfig } = require("../network.config");

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();

    /*
    const NFUSECOLLECTION = await deploy("NfuseCollection", {
        from: deployer,
        log: true
    });*/



    const NFUSEFACTORY = await deploy("NfuseFactory", {
        from: deployer,
        log: true,
        args: [0, "0x3a7f4Cb1b2424C5Fd3217ab8aedF383952DF5fB5"]
    });
};