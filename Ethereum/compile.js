const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "Build");

fs.removeSync(buildPath);

const FundRaising = path.resolve(__dirname, "Contracts", "Fundraising.sol");

const source = fs.readFileSync(FundRaising, "utf8");

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(
        path.join(buildPath, contract.replace(":", "") + ".json"),
        output[contract]
    );
}
