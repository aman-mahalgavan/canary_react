import web3 from "../Ethereum/web3";

export const daysToBlockNumber = (days) => {
    // Average Block time of an ethereum block is 15 s
    let value = Math.round((days * 24 * 60 * 60) / 15);
    return value;
}

export const blockNumberToDays = (blockNumber) => {
    let value = Math.round((blockNumber * 15) / (24 * 60 * 60));
    return value;
}


export const calculateRemainingDays = (deadline, currentBlock) => {
    let remainingBlocks = deadline - currentBlock;
    
    let deadlineCrossed = false;
    let remainingDays;
    if (remainingBlocks < 0) {
        deadlineCrossed = true;
    }
    else {
        remainingDays = blockNumberToDays(remainingBlocks);
    }
    
    return { deadlineCrossed, remainingDays }
}

export const etherToWei = (value) => {
    return web3.utils.toWei(value, "ether")
}

export const weiToEther = (value) => {
    return web3.utils.fromWei(value, "ether")
}

export const calculateRaisedPercentage = (goal, balance) => {

    return (web3.utils.fromWei(balance, "ether") * 100) / web3.utils.fromWei(goal, "ether");
}