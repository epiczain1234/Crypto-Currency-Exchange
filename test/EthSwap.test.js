// testing smart contract using the chai javascript library

const { assert } = require('chai');
const { default: Web3 } = require('web3');

const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

require('chai')
    .use(require('chai-as-promised'))
    .should()

// cam use this to convert regular smart tokens to wei (including the custom tokens we are using)
function tokens(n){
    return web3.utils.toWei(n, 'ether');
}
    
// Ethswap contract
contract('EthSwap', (accounts) => {
    let token, ethSwap;
    // this hok is commonly used to make sure that the prerequisite steps are performed before the rest of the code is executed
    before(async () => {
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);
        // Transfer all tokens to Ethswap
        await token.transfer(ethSwap.address, tokens('1000000'))
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
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buyTokens()', async () => {
        it('Allows user to instantly purchase tokens from ethSwap foir a fixed price', async () => {
            ethSwap.buytokens({from: accounts[1], value: tokens('1000000')})
        })
    })
})