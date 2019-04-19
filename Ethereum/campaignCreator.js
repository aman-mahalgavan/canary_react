import web3 from "./web3";
import campaignCreator from "./Build/campaignCreator.json";

const instance = new web3.eth.Contract(
    JSON.parse(campaignCreator.interface),
    "0x4b086D929bbd737DF6C1ea32A2B3874dbc1966a5"
);

export default instance;