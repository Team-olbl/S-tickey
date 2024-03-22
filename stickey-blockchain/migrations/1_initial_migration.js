const ApplicationHandler = artifacts.require("ApplicationHandler");
const Ticket = artifacts.require("Ticket");
const Reword = artifacts.require("Reword");

module.exports = async function (deployer) {
  await deployer.deploy(Reword);
  rwd = await Reword.deployed();
  await deployer.deploy(Ticket);
  ticket = await Ticket.deployed();
  await deployer.deploy(ApplicationHandler, rwd.address, ticket.address);
};
