/*
 * PG was here
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {NfuseCollection} from "./NfuseCollection.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

contract NfuseFactory is Ownable {
    event CollectionCreation(
        address indexed _from,
        string indexed _name,
        string indexed _symbol
    );

    uint256 createPrice;
    address collectionImplementationLocation;

    constructor(uint256 _createPrice, address _collectionImplementationLocation)
    {
        createPrice = _createPrice;
        collectionImplementationLocation = _collectionImplementationLocation;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function createCollection(
        string memory _name,
        string memory _symbol,
        uint256 _mintPrice
    ) public payable returns (address) {
        require(
            msg.sender != address(0),
            "Cannot create collection for the zero address"
        );
        require(
            msg.value >= createPrice,
            "Amount sent is below creation price"
        );

        address freshCollection = Clones.clone(
            collectionImplementationLocation
        );

        NfuseCollection(freshCollection).initialize(_name, _symbol, _mintPrice);

        emit CollectionCreation(freshCollection, _name, _symbol);
        return freshCollection;
    }
}
