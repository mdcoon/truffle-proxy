// an alternative parse-json: https://www.npmjs.com/package/parse-json (may delete this)
// JSON parse MDN reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
// Written out structure: https://www.tutorialkart.com/nodejs/nodejs-parse-json/
// Written out alternative structure & explanation: https://flaviocopes.com/nodejs-parse-json/
// String Methods: levelup.gitconnected.com/essential-javascript-string-methods-f1841dad1961

// 1. require node modules
var fs = require("fs"); // include file system module
var path = require("path");

// 2. Source the data
// here the problem is that I need to source the data more precisely
// ConfigOption could be a solution.
// Access the Artifact

// 4. set conditions for JSON Parse
// Logic for isolating the network ID
// Logic for isolating the address
// Logic for isolating the transaction hash

// take from command line flags

// "networks": 1525343635906"
// {
//     "address": "0xd8e2af5be9af2a45fc3ee7cdcb68d9bcc37a3c81",
//     "transactionHash": "0xb8ec575a9f3eca4a11a3f61170231a1816f7c68940d8487e56567adcf5c0a21e"
// }

// 5. parseState method
function parseState(dataSource) {

  let results = [];

  let fileContents = null;
  try {
    fileContents = fs.readFileSync(
      dataSource, // "/path/to/file.json"
      "utf-8"
    );
  } catch(err) {
    console.error(err);
    return;
  }

  let jsonParsed = null;
  try {
    jsonParsed = JSON.parse(fileContents);
  } catch(err) {
    console.error(err);
    return;
  }

  const contractName = jsonParsed.contractName;
  const networkIds = Object.keys(jsonParsed.networks);

  networkIds.forEach((networkId) => {
    const deployment = jsonParsed.networks[networkId];
    const address = deployment.address;

    const result = {
      contractName: contractName,
      networkId: networkId,
      address: address
    };

    results.push(result);
  });


  return results;
}


const USAGE = ``;

const SUMMARY = `
Congratulations, you have just created a proxy contract!

To learn more about how to integrate with a proxy contract, view Example.sol
`;

async function summarize (config) {
  // const commandName = config._[0];
  // const commandArguments = config._.slice(1);

  const contractBuildDir = path.join(config._values.working_directory, 'build', 'contracts');

  const filenames = fs.readdirSync(contractBuildDir);

  let results = [];
  filenames.forEach((filename) => {
    const filePath = path.join(contractBuildDir, filename);
    const r = parseState(filePath);
    results = results.concat(r);
  });

  console.log(results);

};

module.exports = summarize;

summarize({
  _values: {
    working_directory: "/home/mike/projects/MetaCoin"
  }
});
