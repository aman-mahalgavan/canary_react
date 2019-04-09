import web3 from "./web3";
import campaignCreator from "./Build/campaignCreator.json";

const instance = new web3.eth.Contract(
    JSON.parse(campaignCreator.interface),
    "0xC7C5fdc1d1A66953e970b84D94b5bAe1851349e3"
);

export default instance;