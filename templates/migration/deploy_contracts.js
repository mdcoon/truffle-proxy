const Proxy = artifacts.require("Proxy");
const Sample = artifacts.require("Sample")

module.exports = async function(deployer) {
  
  await deployer.deploy(Sample);
  await Sample.deployed().then(async d=>{
    let con = new web3.eth.Contract(d.abi, d.address, {address: d.address})
    let accts = await web3.eth.getAccounts();
    let p = null;
    try {
      p = await Proxy.deployed();
    } catch (e) {
      //ignore
    }
    
    if(!p) {
      let txnData = con.methods.postConstructor(5).encodeABI();
      console.log("Deploying new proxy instance");
      await deployer.deploy(Proxy, txnData, d.address);
      await Proxy.deployed().then(async p2=>{
        let gbSig = con.methods.visit().encodeABI();
        console.log("Visit call", gbSig, 'from', accts[0], 'to', p2.address);
        await web3.eth.sendTransaction({
          from: accts[0],
          to: p2.address,
          gas: 600000,
          gasPrice: 100000000,
          data: gbSig
        });
        let vData = con.methods.guestBook(accts[0]).encodeABI();
        let visits = await web3.eth.call({
          to: p2.address,
          data: vData
        });
        console.log("VISITORS", visits);
      })
    } else {
      console.log("Upgrading contract with new deployment address");
      let txnData = con.methods.updateCode(d.address).encodeABI();
      await web3.eth.sendTransaction({
        from: accts[0],
        to: p.address,
        data: txnData,
        gas: 600000,
        gasPrice: 10000000000
      });
      console.log("New address applied, verifying");
      await new Promise((done)=>{
        setTimeout(async ()=>{
          //wait for txn confirmation so that new address is actually established
          /*
          let gbSig = con.methods.visit().encodeABI();
          await web3.eth.sendTransaction({
            from: accts[1],
            to: p.address,
            data: gbSig
          });
          */
          let vData = con.methods.guestBook(accts[0]).encodeABI();
          let visits = await web3.eth.call({
            to: p.address,
            data: vData
          });
          console.log("Old visits log entry", visits);

          let cAddrTxn = con.methods.codeAddress().encodeABI();
          let cAddr = await web3.eth.call({
            to: p.address,
            data: cAddrTxn
          });
          console.log("CAddr", cAddr);
          done();
        }, 2000);
      })
    }
  })
  
};
