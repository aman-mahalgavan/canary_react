import web3 from "../Ethereum/web3";

export default (add1, add2) => {
    return web3.utils.toChecksumAddress(add1) === web3.utils.toChecksumAddress(add2)
}