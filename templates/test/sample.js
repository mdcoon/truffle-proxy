const Proxy = artifacts.require("Proxy");
const Sample = artifacts.require("Sample")
const BN = web3.utils.BN;

contract("Sample", accounts => {
  // it("should put 10000 Sample in the first account", () =>
  //   Sample.deployed()
  //     .then(instance => instance.getBalance.call(accounts[0]))
  //     .then(balance => {
  //       assert.equal(
  //         balance.valueOf(),
  //         10000,
  //         "10000 wasn't in the first account"
  //       );
  //     }));
  //
  // it("should not call visit", () => {
  //   let meta;
  //   let metaCoinBalance;
  //   let metaCoinEthBalance;
  //
  //   return Sample.deployed()
  //     .then(instance => {
  //       meta = instance;
  //       return meta.visit.call();
  //   });
  // });
  //
  // it("should have one visitor", async () => {
  //
  //   const accounts = await web3.eth.getAccounts();
  //   const account = accounts[0];
  //
  //   const sampleDeployment = await Sample.deployed();
  //   const proxyDeployment = await Proxy.deployed();
  //
  //   const sampleContractInstance = new web3.eth.Contract(
  //     sampleDeployment.abi,
  //     sampleDeployment.address,
  //     { address: sampleDeployment.address }
  //   );
  //
  //   const vData = sampleContractInstance.methods.guestBook(account).encodeABI();
  //
  //   const visits = await web3.eth.call({
  //     to: proxyDeployment.address,
  //     data: vData
  //   });
  //
  //   console.log({visits: visits});
  //
  // });
  //
  // it("should prevent guest signing twice", async () => {
  //
  //   const accounts = await web3.eth.getAccounts();
  //   const account = accounts[0];
  //
  //   const sampleDeployment = await Sample.deployed();
  //   const proxyDeployment = await Proxy.deployed();
  //
  //   const sampleContractInstance = new web3.eth.Contract(
  //     sampleDeployment.abi,
  //     sampleDeployment.address,
  //     { address: sampleDeployment.address }
  //   );
  //
  //   const vData = sampleContractInstance.methods.guestBook(account).encodeABI();
  //
  //   const visits = await web3.eth.call({
  //     to: proxyDeployment.address,
  //     data: vData
  //   });
  //
  //   const visits2 = await web3.eth.call({
  //     to: proxyDeployment.address,
  //     data: vData
  //   });
  //
  //   console.log({visits: visits});
  //
  // });

    it("should be 5 max guests", async () => {

      const sampleDeployment = await Sample.deployed();
      const proxyDeployment = await Proxy.deployed();

      const sampleContractInstance = new web3.eth.Contract(
        sampleDeployment.abi,
        proxyDeployment.address,
        { address: proxyDeployment.address }
      );

      const maxGuests = new BN(await sampleContractInstance.methods.maxGuests().call()).toNumber();

      assert.equal(maxGuests, 5);
    });


  it("should increment counter by 1", async () => {

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const sampleDeployment = await Sample.deployed();
    const proxyDeployment = await Proxy.deployed();

    const sampleContractInstance = new web3.eth.Contract(
      sampleDeployment.abi,
      proxyDeployment.address,
      { address: proxyDeployment.address }
    );

    const before = new BN(await sampleContractInstance.methods.count().call()).toNumber();

    await sampleContractInstance.methods.increment().send({
      from: account,
      gas: 600000,
      gasPrice: 100000000
    });

    const after = new BN(await sampleContractInstance.methods.count().call()).toNumber();

    assert.equal(before, after - 1);
  });

});
