pragma solidity ^0.5.1;

import './LibraryLockDataLayout.sol';

contract SampleDataLayout is LibraryLockDataLayout {
    event NewContractAddress(address newAddress);
    
    uint public count;
    uint public maxGuests;
    mapping(address=>bool) public guestBook;
}