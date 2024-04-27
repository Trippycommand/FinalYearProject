// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import './CustomToken.sol';

contract CryptoScoutDex {
    // Eth Value:
    uint256 ethValue = 100000000000000;

    // Custom Tokens:
    string[] public tokens = [
        'Ethereum',
        'Tether USDt',
        'USDC',
        'Shiba Inu',
        'BNB',
        'TRON',
        'Uniswap',
        'Polygon'
    ];
    mapping(string => ERC20) public tokenInstanceMap;

    // Transaction History:
    uint256 public _historyIndex;
    struct History {
        uint256 historyId;
        string tokenA;
        string tokenB;
        uint256 inputValue;
        uint256 outputValue;
        address userAddress;
    }
    mapping(uint256 => History) private historys;

    // ----------------------------------------------------------

    constructor() {
        for (uint256 i = 0; i < tokens.length; i++) {
            CustomToken token = new CustomToken(tokens[i], tokens[i]);
            tokenInstanceMap[tokens[i]] = token;
        }
    }

    // ----------------------------------------------------------

    function getName(
        string memory tokenName
    ) public view returns (string memory) {
        return tokenInstanceMap[tokenName].name();
    }

    function getTokenAddress(
        string memory tokenName
    ) public view returns (address) {
        return address(tokenInstanceMap[tokenName]);
    }

    function getTotalSupply(
        string memory tokenName
    ) public view returns (uint256) {
        return tokenInstanceMap[tokenName].totalSupply();
    }

    function getBalance(
        string memory tokenName,
        address _address
    ) public view returns (uint256) {
        return tokenInstanceMap[tokenName].balanceOf(_address);
    }

    function getEthBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAllHistory() public view returns (History[] memory) {
        uint256 itemCount = _historyIndex;
        uint256 currentIndex = 0;

        History[] memory items = new History[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currrenId = i + 1;
            History storage currentItem = historys[currrenId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }

        return items;
    }

    // ----------------------------------------------------------

    function swapEthToToken(
        string memory tokenName,
        uint256 destAmount
    ) public payable {
        uint256 srcAmount = msg.value;
        require(tokenInstanceMap[tokenName].transfer(msg.sender, destAmount));
        _transactionHistory('Ethereum', tokenName, srcAmount, destAmount);
    }

    function swapTokenToEth(
        string memory tokenName,
        uint256 srcAmount,
        uint256 destAmount
    ) public {
        require(
            address(this).balance >= destAmount,
            'Dex is running low on balance.'
        );

        payable(msg.sender).transfer(destAmount);
        require(
            tokenInstanceMap[tokenName].transferFrom(
                msg.sender,
                address(this),
                srcAmount
            )
        );
        _transactionHistory(tokenName, 'Ethereum', srcAmount, destAmount);
    }

    function swapTokenToToken(
        string memory srcTokenName,
        string memory destTokenName,
        uint256 srcAmount,
        uint256 destAmount
    ) public {
        require(
            tokenInstanceMap[srcTokenName].transferFrom(
                msg.sender,
                address(this),
                srcAmount
            )
        );
        require(
            tokenInstanceMap[destTokenName].transfer(msg.sender, destAmount)
        );
        _transactionHistory(srcTokenName, destTokenName, srcAmount, destAmount);
    }

    // ----------------------------------------------------------

    function _transactionHistory(
        string memory tokenA,
        string memory tokenB,
        uint256 inputValue,
        uint256 outputValue
    ) internal {
        _historyIndex++;
        uint256 _historyId = _historyIndex;
        History storage history = historys[_historyId];
        history.historyId = _historyId;
        history.userAddress = msg.sender;
        history.tokenA = tokenA;
        history.tokenB = tokenB;
        history.inputValue = inputValue;
        history.outputValue = outputValue;
    }
}
