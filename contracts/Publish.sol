pragma solidity ^0.5.0;

contract Publish {
  address[16] public publishers;

  // Publishing a book
  function publish(uint bookId) public returns (uint) {
  require(bookId >= 0 && bookId <= 3);

  publishers[bookId] = msg.sender;

  return bookId;
  }

  // Retrieving the publishers
  function getPublishers() public view returns (address[16] memory) {
    return publishers;
  }
}
