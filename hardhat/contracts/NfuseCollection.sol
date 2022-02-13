/*
 * PG was here
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Base64} from "base64-sol/base64.sol";
import {ERC721URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract NfuseCollection is ERC721URIStorageUpgradeable, OwnableUpgradeable {
    uint256 tokenCount;
    uint256 mintPrice;
    address payable reciever;

    constructor() {}

    function withdraw() public {
        payable(owner()).transfer(address(this).balance);
    }

    function initialize(
        string memory _name,
        string memory _symbol,
        uint256 _mintPrice
    ) public initializer {
        __ERC721_init(_name, _symbol);
        mintPrice = _mintPrice;
    }

    function mint(
        string memory _svg,
        string memory _name,
        string memory _description,
        string memory _external_uri
    ) public payable {
        require(msg.sender != address(0), "Cannot mint to the zero address");
        require(
            msg.value == mintPrice,
            "Amount sent does not match mint price"
        );
        _safeMint(msg.sender, tokenCount);
        string memory imageUri = svgToImageUri(_svg);
        string memory tokenUri = createTokenUri(
            imageUri,
            _external_uri,
            _name,
            _description
        );
        _setTokenURI(tokenCount, tokenUri);
        tokenCount += 1;
    }

    function svgToImageUri(string memory _svg)
        private
        pure
        returns (string memory)
    {
        string memory baseUrl = "data:image/svg+xml;base64,";
        string memory svgBase64 = Base64.encode(
            bytes(string(abi.encodePacked(_svg)))
        );

        return string(abi.encodePacked(baseUrl, svgBase64));
    }

    function createTokenUri(
        string memory _imageUri,
        string memory _externalUri,
        string memory _tokenName,
        string memory _tokenDescription
    ) private pure returns (string memory) {
        string memory baseUrl = "data:application/json;base64,";

        string memory description = string(
            abi.encodePacked('"description": "', _tokenDescription, '",')
        );
        string memory externalUri = string(
            abi.encodePacked('"external_url": "', _externalUri, '",')
        );
        string memory image = string(
            abi.encodePacked('"image": "', _imageUri, '",')
        );
        string memory name = string(
            abi.encodePacked('"name": "', _tokenName, '",')
        );
        string memory attributes = string(abi.encodePacked('"attributes": []'));

        return
            string(
                abi.encodePacked(
                    baseUrl,
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                "{",
                                description,
                                externalUri,
                                image,
                                name,
                                attributes,
                                "}"
                            )
                        )
                    )
                )
            );
    }
}
