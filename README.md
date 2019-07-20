# Welcome to truffle-proxy

Originally developed during **ConsenSys Grants Hackathon - New York - July 2019**

> Extend Truffle CLI with [EIP-1820](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1820.md) proxy support. Proxy support provides a simple upgrade path for contracts to maintain storage, while making changes to the underlying contract implementation.

## Install

```sh
npm install --save-dev truffle-plugin-proxy
```

## Usage

```sh

// Generate proxy support for a Truffle project
truffle run create-proxy

// Run all existing tests
truffle run test-proxy

// Summarize proxy & contract deployment information
truffle run summarize-proxy

// Deploy a new underlying contract and update proxy to use new contract address
truffle run upgrade

```

## Authors

👤 **Harvinder Ghotra**

- Github: [@hghotra](https://github.com/hghotra)


👤 **Mitchell Opatowsky**

- Github: [@official-mitchell](https://github.com/official-mitchell)


👤 **Mike Coon**

- Github: [@mdcoon](https://github.com/mdcoon)


👤 **Mike Powers**

- Github: [@mjpowersjr](https://github.com/mjpowersjr)


👤 **Will Shahda**

- Github: [@opz](https://github.com/opz)



## Show your support

Give a ⭐️ if this project helped you!
