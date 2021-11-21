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

    const NFUSE = await deploy("nfuse", {
        from: deployer,
        log: true,
        args: ["nfuse", "NFSE", "0x4EE7201DaD75B24DA5bB6A4483c15cb12C806252"]
    });
};