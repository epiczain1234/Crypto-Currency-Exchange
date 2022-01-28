pragma solidity >= 0.5.0;
import "./Token.sol";

contract EthSwap {
    // state variables which can be found on the blockchain
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    constructor (Token _token) public {
        token = _token;

    }

    // recipient is the person that calls this functions
    // payable allows us to send ether upon this function being called
    function buytokens() payable public{
        // msg is a global function and sender is the address of the person who called this function
        uint tokenAmount = rate * msg.value; // function that tells us how much ether was sent during the functions call
        token.transfer(msg.sender, tokenAmount);

    }
    
}