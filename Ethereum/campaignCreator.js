import web3 from "./web3";
import campaignCreator from "./Build/campaignCreator.json";

const instance = new web3.eth.Contract(
    JSON.parse(campaignCreator.interface),
    "0xe18642e663f8665beB36ff1D148b36b0eB17AB6D"
);

export default instance;