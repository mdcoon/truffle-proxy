
const metadata = require('./package.json');

const appRoot = process.env.PWD;

console.log("PWD: " + appRoot);


console.log(`Please add ${metadata.name} to the 'plugins' section of your truffle config!`);
