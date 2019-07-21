# Welcome to truffle-proxy

Winning project at **ConsenSys Grants Hackathon - New York - July 2019**

> See **truffle-proxy-ui** [here](https://github.com/mdcoon/truffle-proxy-ui)

> Extend Truffle CLI with [EIP-1822](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1822.md) proxy support. Proxy support provides a simple upgrade path for contracts to maintain storage, while making changes to the underlying contract implementation.

## Install

```sh
// tip: to start a new truffle project:
// truffle init
// within your truffle project:
npm init -y
npm install --save-dev git+https://github.com/mdcoon/truffle-proxy
```

Add the following to your `truffle-config.js`
```json
  plugins: [
    "truffle-proxy"
  ]
```


## Usage

### Add proxy support to a truffle project
Generates EIP-1820 compatible proxy implementation along with example files and
unit tests for your project.
```sh
truffle run create-proxy
```

### Run unit tests
Executes all unit tests against an embedded Ganache blockchain compatible with
proxy contract.
```sh
truffle run test-proxy
```

### Display summary network info
Displays a summary of network / address information for deployed contracts.
Includes details highlighting proxy contracts.
```sh
truffle run summarize-proxy
```

## Authors

👤 **Mike Coon**

- Github: [@mdcoon](https://github.com/mdcoon)

👤 **Harvinder Ghotra**

- Github: [@hghotra](https://github.com/hghotra)

👤 **Mitchell Opatowsky**

- Github: [@official-mitchell](https://github.com/official-mitchell)

👤 **Mike Powers**

- Github: [@mjpowersjr](https://github.com/mjpowersjr)

👤 **Will Shahda**

- Github: [@opz](https://github.com/opz)



## Show your support

Give a ⭐️ if this project helped you!
