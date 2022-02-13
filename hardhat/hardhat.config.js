require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_URL = process.env.RINKEBY_URL;
const ROPSTEN_URL = process.env.ROPSTEN_URL;
const MNEMONIC = process.env.MNEMONIC;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: RINKEBY_URL,
      accounts: {
        mnemonic: MNEMONIC
      },
      saveDeployments: true
    },
    ropsten: {
      url: ROPSTEN_URL,
      accounts: {
        mnemonic: MNEMONIC
      },
      saveDeployments: true
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY
  },
  solidity: "0.8.4",
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};
