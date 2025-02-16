//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ScaffoldERC721} from "../contracts/ScaffoldERC721.sol";

import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        ScaffoldERC721 yourContract = new ScaffoldERC721(
            "Test",
            "T",
            // "ipfs://bafybeicilmsvboiccw7tba3knvxiokuxysqxwgycmr3vwfisypefcmxxwu/",
            "ipfs://bafybeicpvzgkhgyhwggrtctzvztuk2mftmt56xogv6pi7mx2v42go35ltu/",
            0,
            0,
            0,
            1
        );

        yourContract.batchMint(0x2F15D4A66D22ecC6967928b6A76Ab06897b05676, 15);

        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
