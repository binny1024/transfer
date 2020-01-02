pragma solidity ^0.5.0;

contract Transfer3 {
    address payable public creator;
    uint256 _a;
    mapping(address => uint256) _balances;

    function setA(uint256 a) public {
        _a = a;
    }

    function getA() public returns (uint256){
        return _a;
    }
    constructor (uint256 amount) public {
        creator = msg.sender;
//        require(amount<=9,"也不知到啥云因");
        _a = amount;
        _balances[creator] = amount;
    }
    function() payable external {
        msg.sender.transfer(1);
    }

    // Check address balances
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function batchTransfer(address[] memory payees, uint256 amount) public {

    }

    // 合约代币转移
    function transfer(address from,address to,uint256 amount )public {
        require(_balances[from] >= amount,"token`s balance is not enough !");
        _balances[from] -= amount;
        _balances[to] +=amount;
    }
}