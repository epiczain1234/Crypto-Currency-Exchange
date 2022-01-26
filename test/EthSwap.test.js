// testing smart contract using the chai javascript library

const { assert } = require('chai');

const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai')
    .use(require('chai-as-promised'))
    .should()

    
// Ethswap contract
contract('EthSwap', (accounts) => {
    describe('Token deployment', async () => {
        it('contract has a name', async () => {
            let token = await Token.new()
            const name = await token.name()
            assert.equal(name, "Zain Token") 
        })
    })
    describe('EthSwap deployment', async () => {
        it('contract has a name', async () => {
            let ethSwap = await EthSwap.new()
            const name = await ethSwap.name()
            assert.equal(name, "EthSwap Instant Exchange") 
        })
    
        it('contract has tokens',async () => {
            let token = await Token.new();
            let ethSwap = await EthSwap.new();
            await token.transfer(ethSwap.address, '1000000000000000000000000')
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), '1000000000000000000000000')
        })
    })
})