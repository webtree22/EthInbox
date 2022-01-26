

const HDWalletProvider=require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  'service push stuff theory mystery addict basket decide pink liberty observe bone',
  'https://rinkeby.infura.io/v3/d7cbd8905f83422997c363da23d6f3d6'
);

const web3 = new Web3(provider); 



const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hello"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  console.log(result.options.address )
  provider.engine.stop();
}

deploy();