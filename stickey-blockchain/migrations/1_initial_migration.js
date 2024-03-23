const ApplicationHandler = artifacts.require("ApplicationHandler");
const Reword = artifacts.require("Reword");

module.exports = async function (deployer) {
  await deployer.deploy(Reword);
  rwd = await Reword.deployed();
  await deployer.deploy(ApplicationHandler, rwd.address);
};
