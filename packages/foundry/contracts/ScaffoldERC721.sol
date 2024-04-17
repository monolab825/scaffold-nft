//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Constraints.sol";

contract ScaffoldERC721 is ERC721 {
    error ScaffoldERC721__MintNotWithinTimeframe();
    error ScaffoldERC721__MintNotEnoughMintPrice();

    uint256 immutable s_mintStartTimestamp;
    uint256 immutable s_mintEndTimestamp;
    uint256 immutable s_mintPrice;

    uint256 s_mintCount;

    constructor(
        string memory name,
        string memory symbol,
        uint256 mintStartTimestamp,
        uint256 mintEndTimestamp,
        uint256 mintPrice
    ) ERC721(name, symbol) {
        s_mintStartTimestamp = mintStartTimestamp;
        s_mintEndTimestamp = mintEndTimestamp;
        s_mintPrice = mintPrice;
    }

    function batchMint(address recipient, uint256 amount) public payable {
        if (msg.value < s_mintPrice * amount) {
            revert ScaffoldERC721__MintNotEnoughMintPrice();
        }

        for (uint256 i = 0; i < amount; i++) {
            _mint(recipient);
        }
    }

    function mint(address recipient) public payable {
        if (msg.value < s_mintPrice) {
            revert ScaffoldERC721__MintNotEnoughMintPrice();
        }

        _mint(recipient);
    }

    function _mint(address recipient) internal {
        if (!isWithinConstraints()) {
            revert ScaffoldERC721__MintNotWithinTimeframe();
        }

        super._mint(recipient, s_mintCount);
        s_mintCount++;
    }

    function isWithinConstraints() public view returns (bool isWithin) {
        isWithin = Constraints.isWithin(
            block.timestamp, getMintStartTimestamp(), getMintEndTimestamp()
        );
    }

    function getMintStartTimestamp() public view returns (uint256) {
        return s_mintStartTimestamp;
    }

    function getMintEndTimestamp() public view returns (uint256) {
        return s_mintEndTimestamp;
    }
}
