pragma solidity ^0.5.1;

import './Proxiable.sol';
import './Owned.sol';
import './SampleDataLayout.sol';
import './LibraryLock.sol';

contract Sample  is SampleDataLayout, Owned, Proxiable, LibraryLock {
    function postConstructor(uint256 max) public {
        require(!initialized);
        maxGuests = max;
        initialize();
        setOwner(msg.sender);
    }

    function updateCode(address newAddress) public onlyOwner delegatedOnly {
        updateCodeAddress(newAddress);
    }

    function visit() public delegatedOnly {
        require(!guestBook[msg.sender], "Guest exists");
        guestBook[msg.sender] = true;
    }

    function codeAddress() public delegatedOnly returns (address cAddr) {
        assembly {
            cAddr := sload(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7)
           
        }
    }
}