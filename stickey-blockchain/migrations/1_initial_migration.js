const Storage = artifacts.require("Storage");

module.exports = async function (deployer) {
  await deployer.deploy(Storage);
};
