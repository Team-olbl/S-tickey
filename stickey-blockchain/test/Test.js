const Ticket = artifacts.require("Ticket");
const Reword = artifacts.require("Reword");

contract("Ticket", () => {
  it("Ticket Test", async () => {
    const ticket = await Ticket.deployed();
    const res = await ticket.mintTicket(1, 1, 1, 1, [1], { value: 10 ** 9 });
  });
});
