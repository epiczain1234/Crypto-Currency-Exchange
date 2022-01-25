const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


module.exports = async function(deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

 // Transferring full supply of tokens into the ethswap exchange
  await token.transfer(ethSwap.address, "1000000000000000000000000");
};
