const Ticket = artifacts.require("Ticket");
const Reword = artifacts.require("Reword");

module.exports = async function (deployer) {
  await deployer.deploy(Ticket);
  await deployer.deploy(Reword);
};
