const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


module.exports = async function(deployer) {
  // deplouying the token smart contract
  await deployer.deploy(Token);
  // we are stalling the rest of the function until the token is deplyed, but not the resot of the function
  const token = await Token.deployed();

  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();

 // Transferring full supply of tokens into the ethswap exchange
  await token.transfer(ethSwap.address, "1000000000000000000000000");
};
