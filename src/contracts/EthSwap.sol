pragma solidity >= 0.5.0;
import "./Token.sol";

contract EthSwap {
    // state variables which can be found on the blockchain
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    // events essentially allow us to know when somethign has occured on the blockchain, can be used for smart contracts to meet the condition required
    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );
    constructor (Token _token) public {
        token = _token;

    }

    // recipient is the person that calls this functions
    // payable allows us to send ether upon this function being called
    function buytokens() payable public{
        // msg is a global function and sender is the address of the person who called this function
        uint tokenAmount = rate * msg.value; // function that tells us how much ether was sent during the functions call
        
        // making sure the exchange has enough currency to complete the transaction
        require(token.balanceOf(address(this)) >= tokenAmount);
        // transfers token to the user
        token.transfer(msg.sender, tokenAmount);
        // emit an event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) payable public{
        // Calculate the amount of Ether to redeem
        uint etherAmount = _amount / rate;
        // Perform Sale
        token.transfer(msg.sender,_)
        msg.sender.transfer(etherAmount);

    }
    
}