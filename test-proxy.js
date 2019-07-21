/**
 * Main "truffle run test-proxy" entry point.
 */

module.exports = (config) => {
  const ganache = require('ganache-core');
  const Web3 = require('web3');
  const test = require('truffle-core/lib/commands/test');
  const dir = require("node-dir");

  const network = config['networks'][
    config['network'] || Object.keys(config['networks'])[0]
  ];

  const protocol = 'http://';
  const url = protocol + network.host + ':' + network.port;

  const localHost = '127.0.0.1';
  const localPort = 7545;
  const localId = 4447;

  const web3 = new Web3(Web3.providers.HttpProvider(url));

  web3.eth.getBlockNumber().then(blockNumber => {
    const options = {
      port: localPort,
      network_id: localId,
      fork: url + '@' + blockNumber,
    };

    const server = ganache.server(options);
    server.listen(localPort, (err, result) => {
      const testOptions = {
        _: [],
        network: 'test-proxy',
        networks: {
          'test-proxy': {
            host: localHost,
            port: localPort,
            network_id: localId,
          }
        }
      };

      test.run(testOptions, err => {
        server.close(() => {});
      });
    });
  });
}
