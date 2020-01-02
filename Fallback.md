# 回退函数
合约可以有一个未命名的函数。这个函数不能有参数也不能有返回值。 

如果在一个到合约的调用中，没有其他函数与给定的函数标识符匹配（或没有提供调用数据），那么这个函数（fallback 函数）会被执行。

除此之外，每当合约收到以太币（没有任何数据），这个函数就会执行。
此外，为了接收以太币，`fallback` 函数必须标记为 `payable` 。 如果不存在这样的函数，则合约不能通过普通转账交易接收以太币。

与任何其他函数一样，只要有足够的 gas 传递给它，回退函数就可以执行复杂的操作。

## note
即使 fallback 函数不能有参数，仍然可以使用 msg.data 来获取随调用提供的任何有效数据。

一个没有定义 fallback 函数的合约，直接接收以太币（没有函数调用，即使用 send 或 transfer）会抛出一个异常， 并返还以太币（在 Solidity v0.4.0 之前行为会有所不同）。
所以如果你想让你的合约接收以太币，必须实现 fallback 函数。

## 执行时机
1, 如果调用方打算调用不可用的函数, 也会执行回退函数。
```
pragma solidity >=0.5.0 <0.7.0;

contract Test {
    // 发送到这个合约的所有消息都会调用此函数（因为该合约没有其它函数）。
    // 向这个合约发送以太币会导致异常，因为 fallback 函数没有 `payable` 修饰符
    function() external { x = 1; }
    uint x;
}


// 这个合约会保留所有发送给它的以太币，没有办法返还。
contract Sink {
    function() external payable { }
}

contract Caller {
    function callTest(Test test) public returns (bool) {
        (bool success,) = address(test).call(abi.encodeWithSignature("nonExistingFunction()"));
        require(success);
        //  test.x 结果变成 == 1。

        // address(test) 不允许直接调用 ``send`` ,  因为 ``test`` 没有 payable 回退函数
        // 需要通过 uint160 转化为 ``address payable`` 类型 , 然后才可以调用 ``send``
        address payable testPayable = address(uint160(address(test)));


        // 以下将不会编译，但如果有人向该合约发送以太币，交易将失败并拒绝以太币。
        // test.send(2 ether）;
    }
}
```
2,