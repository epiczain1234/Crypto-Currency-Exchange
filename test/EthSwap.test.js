// testing smart contract using the chai javascript library

const { assert } = require('chai');

const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai')
    .use(require('chai-as-promised'))
    .should()

    
// Ethswap contract
contract('EthSwap', (accounts) => {
    let token, ethSwap;
    // this hok is commonly used to make sure that the prerequisite steps are performed before the rest of the code is executed
    before(async () => {
        token = await Token.new();
        ethSwap = await EthSwap.new();
        // Transfer all tokens to Ethswap
        await token.transfer(ethSwap.address, '1000000000000000000000000')
    })

    describe('Token deployment', async () => {
        it('contract has a name', async () => {
            const name = await token.name()
            assert.equal(name, "Zain Token") 
        })
    })
    // we are using asynchronous functions because we do not want to execute in sequence since we could be wasting a lot of time waiting for 
    // certain blocks of code to finish executing
    describe('EthSwap deployment', async () => {
        it('contract has a name', async () => {
            const name = await ethSwap.name()
            assert.equal(name, "EthSwap Instant Exchange") 
        })
    
        it('contract has tokens',async () => {
            // duplicate initializing of tokens
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), '1000000000000000000000000')
        })
    })
})