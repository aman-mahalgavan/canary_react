const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const campaignCreator = require("./Build/campaignCreator.json");

let provider = new HDWalletProvider(
    "8FE8E4FF34DC3B5C6C7E2AADB256E22A8FD61E6D0F4CACAAEE2DD7ABB240B7A0", // use your testnet account private key
    "https://rinkeby.infura.io/v3/bb20540179824ccb94cf748904d43090" // Use link provided by infura
);

const web3 = new Web3(provider);

const deploy = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);

    console.log("attempting to deploy the contract from account", accounts[0]);

    try {
        let result = await new web3.eth.Contract(
            JSON.parse(campaignCreator.interface)
        )
            .deploy({ data: "0x" + campaignCreator.bytecode })
            .send({ gas: "2000000", from: accounts[0] });

        console.log("Contract deployed to address ", result.options.address);
    } catch (err) {
        console.log(err);
    }
};
deploy();
