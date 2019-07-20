const path = require('path');
const fs = require('fs');
const logger = require('logger').createLogger();

const PLUGIN_NAME = 'truffle-proxy';
const TEMPLATE_DIR = 'templates';
const CONTRACT_DIR = 'contracts';

const USAGE = ``;

const SUMMARY = `
Congratulations, you have just created a proxy contract!

To learn more about how to integrate with a proxy contract, view Example.sol
`;

const TEMPLATES = [
  'contract.sol'
];

module.exports = async (config) => {
  const commandName = config._[0];
  const commandArguments = config._.slice(1);

  if (commandArguments && commandArguments[0] == 'help') {
    logger.info(USAGE);
    return;
  }

  const templateBaseDir = path.join(config._values.working_directory, 'node_modules', PLUGIN_NAME, 'templates');
  const contractDestination = path.join(config._values.working_directory, CONTRACT_DIR);
  if (fs.existsSync(templateBaseDir) && fs.existsSync(contractDestination)) {
    TEMPLATES.forEach((template) => {
      const source = path.join(templateBaseDir, template);
      const destination = path.join(contractDestination, template);
      if (fs.existsSync(source)) {
        logger.info(`Generating ${template}...`);
        fs.copyFileSync(source, destination);
      } else {
        logger.error(`Missing template ${template}`)
      }
    });

    // FIXME: generate migration file
    // FIXME: what if existing migrations?

    logger.info(SUMMARY);
  } else {
    // FIXME: something went wrong
  }

};
