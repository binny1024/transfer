pragma solidity ^0.5.0;

contract Transfer {
    address payable public creator;
    uint256 _a;
    mapping(address => uint256) _balances;

    function setA(uint256 a) public {
        _a = a;
    }

    function getA() public returns (uint256){
        return _a;
    }
    constructor () public {
        creator = msg.sender;
        _balances[creator] = 10000;
    }
    function() payable external {
        msg.sender.transfer(1);
    }


    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function batchTransfer(address[] memory payees, uint256 amount) public {

    }

}