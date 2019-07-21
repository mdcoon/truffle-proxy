/**
 * Main "truffle run test-proxy" entry point.
 */

module.exports = (config) => {
  const ganache = require('ganache-core');
  const Web3 = require('web3');
  const test = require('truffle-core/lib/commands/test');
  const dir = require("node-dir");

  const networkName = config['network'] || Object.keys(config['networks'])[0];
  const network = config['networks'][networkName];

  const localHost = '127.0.0.1';
  const localPort = 7545;
  const protocol = 'http://';
  const url = protocol + network.host + ':' + network.port;

  const web3 = new Web3(Web3.providers.HttpProvider(url));

  web3.eth.getBlockNumber().then(blockNumber => {
    web3.eth.getAccounts().then(accounts => {
      const options = {
        port: localPort,
        network_id: network.network_id,
        fork: url + '@' + blockNumber
      };

      const server = ganache.server(options);
      server.listen(localPort, (err, result) => {
        const testOptions = {
          _: [],
          network: networkName,
          networks: {
            [networkName]: {
              host: localHost,
              port: localPort,
              network_id: network.network_id,
            }
          }
        };

        test.run(testOptions, err => {
          console.log(err);
          server.close(() => {});
        });
      });
    });
  });
}
