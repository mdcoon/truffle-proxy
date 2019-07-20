const path = require('path');
const fs = require('fs');

const USAGE = ``;

const SUMMARY = ```
Congratulations, you have just created a proxy contract!

To learn more about how to integrate with a proxy contract, view Example.sol
```;

const TEMPLATES = [
  // FIXME
];

module.exports = async (config) => {

  if (config.help) {
    logger.info(USAGE);
    return;
  }

  const commandName = config._[0];
  const commandArguments = config._.slice(1);

  const templateBaseDir = ''; // FIXME
  const contractDestination = ''; // FIXME

  TEMPLATES.forEach((template) => {
    const source = path.join(templateBaseDir, template);
    const destination = path.join(contractBaseDir, template);
    log.info(`Generating ${template}...`);
    fs.copyFileSync(source, destination);
  });

  // FIXME: generate migration file
  // FIXME: what if existing migrations?

  logger.info(SUMMARY);

};
