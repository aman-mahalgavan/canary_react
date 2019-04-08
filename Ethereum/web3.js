import Web3 from "web3";





let web3;

if (typeof window !== "undefined" && window.ethereum) {
    web3 = new Web3(window.ethereum)
} else {
    // We are on the server 
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/bb20540179824ccb94cf748904d43090"
    );
    web3 = new Web3(provider);

}

export default web3;



//  USING ONLY INFURA
// const provider = new Web3.providers.HttpProvider(
//   "https://rinkeby.infura.io/v3/bb20540179824ccb94cf748904d43090"
// );
// const web3 = new Web3(provider);


