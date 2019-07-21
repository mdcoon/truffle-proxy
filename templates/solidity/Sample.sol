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
        address myAddr = codeAddress();
        emit NewContractAddress(myAddr);
    }

    /**
     * This function should normally be guarded by onlyOwner. The modifier was
     * removed for the purposes of the demo.
     *
     * Because the proxy-test ganache instance running a forked chain uses
     * different accounts than those used to deploy the contract on the
     * original chain, it does not have access to the owner account.
     *
     * It is important for the proxy-test feature to run the upgrade pattern
     * because it needs to verify that an upgrade deployed live will work
     * properly.
     */
    function updateCode(address newAddress) public delegatedOnly {
        updateCodeAddress(newAddress);
        emit NewContractAddress(newAddress)
    }

    function visit() public delegatedOnly {
        require(!guestBook[msg.sender], "Guest exists");
        guestBook[msg.sender] = true;
    }

    function increment() public delegatedOnly {
        count += 1;
    }

    function codeAddress() public delegatedOnly returns (address cAddr) {
        assembly {
            cAddr := sload(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7)
           
        }
    }
}
