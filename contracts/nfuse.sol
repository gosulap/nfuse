/*
 * PG was here
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "base64-sol/base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nfuse is ERC721URIStorage, Ownable {
    uint256 tokenCount;
    uint256 mintPrice;
    address payable reciever;

    constructor(
        string memory _name,
        string memory _symbol,
        address payable _fundsReciever
    ) ERC721(_name, _symbol) {
        tokenCount = 0;
        mintPrice = 100000000000000;
        reciever = _fundsReciever;
    }

    function withdraw() public onlyOwner {
        reciever.transfer(address(this).balance);
    }

    function mint(
        string memory _svg,
        string memory _name,
        string memory _description
    ) public payable {
        require(msg.sender != address(0), "Cannot mint to the zero address");
        require(
            msg.value == mintPrice,
            "Amount sent does not match mint price"
        );
        _safeMint(msg.sender, tokenCount);
        string memory imageUri = svgToImageUri(_svg);
        string memory anotherUri = createTokenUri(
            imageUri,
            "",
            _name,
            _description
        );
        _setTokenURI(tokenCount, anotherUri);
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
