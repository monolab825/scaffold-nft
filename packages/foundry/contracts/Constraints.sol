//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

library Constraints {
    function isWithin(
        uint256 a,
        uint256 b,
        uint256 c
    ) public pure returns (bool value) {
        if (b == 0 && c == 0) {
            value = true;
        }
        if (b != 0 && c != 0) {
            value = a >= b && a <= c;
        }

        if (b == 0) {
            value = a <= c;
        }

        if (c == 0) {
            value = a >= b;
        }
    }
}
