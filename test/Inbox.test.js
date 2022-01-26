const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //   console.log(accounts);
  //use one of the account to deploy the contrat
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hello"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("initializes the contract", async () => {
    assert.equal(await inbox.methods.message().call(), "Hello");
  });

  it("sets message correctly", async () => {
    await inbox.methods.setMessage("World").send({ from: accounts[0] });
    assert.equal(await inbox.methods.message().call(), "World");
  });
});
