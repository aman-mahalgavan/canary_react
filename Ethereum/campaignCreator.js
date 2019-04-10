import web3 from "./web3";
import campaignCreator from "./Build/campaignCreator.json";

const instance = new web3.eth.Contract(
    JSON.parse(campaignCreator.interface),
    "0x2C46B96D99e9970e2af2a4b0c91f53b0447acF4b"
);

export default instance;