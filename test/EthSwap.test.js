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
contract('EthSwap', ([deployer, investor]) => {
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

    describe('buytokens()', async () => {
        let result
        before(async () => {
            // purchase tokens before each example
            result = await ethSwap.buytokens({from: investor, value:web3.utils.toWei('1','ether')})
        });

        it('Allows user to instantly purchase tokens from ethSap for a fixed price', async() => {
            // check investor token balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))
            // check exchange balance after purchase
            let ethSwapBalance

            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

            // console.log(result.logs)
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
        })
        })
     
    })
