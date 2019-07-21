const path = require('path');
const fs = require('fs');
const logger = require('logger').createLogger();

const PLUGIN_NAME = 'truffle-proxy';
const TEMPLATE_DIR_NAME = 'templates';
const CONTRACT_DIR_NAME = 'contracts';
const MIGRATION_DIR_NAME = 'migrations';

const USAGE = ``;

const SUMMARY = `
Congratulations, you have just created a proxy contract!

To learn more about how to interact with a proxy contract, view Sample.sol
`;


module.exports = async (config) => {
  const commandName = config._[0];
  const commandArguments = config._.slice(1);

  if (commandArguments && commandArguments[0] == 'help') {
    logger.info(USAGE);
    return;
  }

  const projectDir = config._values.working_directory;
  const nodeModuleDir = path.join(projectDir, 'node_modules');
  const pluginDir = path.join(nodeModuleDir, PLUGIN_NAME);
  const templateDir = path.join(pluginDir, TEMPLATE_DIR_NAME)
  const solidityTemplateDir = path.join(templateDir, 'solidity');
  const migrationTemplateDir = path.join(templateDir, 'migration');
  const contractDestination = path.join(projectDir, CONTRACT_DIR_NAME);
  const migrationDestination = path.join(projectDir, MIGRATION_DIR_NAME);

  if (fs.existsSync(solidityTemplateDir) &&
    fs.existsSync(migrationTemplateDir) &&
    fs.existsSync(contractDestination) &&
    fs.existsSync(migrationDestination)) {

    solidityTemplates = fs.readdirSync(solidityTemplateDir);
    migrationTemplates = fs.readdirSync(migrationTemplateDir);
    migrations = fs.readdirSync(migrationDestination);

    logger.info(`Generating solidity templates...`);
    solidityTemplates.forEach((template) => {
      const source = path.join(solidityTemplateDir, template);
      const destination = path.join(contractDestination, template);
      logger.info(`...${template}...`);
      fs.copyFileSync(source, destination);
    });

    var migrationCounter = 0;
    migrations.forEach((migration) => {
      if (migration.split('_')[0] > migrationCounter) {
        migrationCounter = migration.split('_')[0];
      }
    });

    logger.info(`Generating migration templates...`);
    migrationTemplates.forEach((template) => {
      migrationCounter++;
      destTemplate = migrationCounter + "_" + template;
      const source = path.join(migrationTemplateDir, template);
      const destination = path.join(migrationDestination, destTemplate);
      logger.info(`...${destTemplate}...`);
      fs.copyFileSync(source, destination);
    });

    // FIXME: generate migration file
    // FIXME: what if existing migrations?

    logger.info(SUMMARY);
  } else {
    logger.error("Something went wrong ..");
    // FIXME: something went wrong
  }

};
