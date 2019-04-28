pragma solidity ^0.5.0;

contract Purchase {
  address[16] public customers;

  // Purchasing a book
  function purchase(uint bookId) public returns (uint) {
  require(bookId >= 0 && bookId <= 3);

  customers[bookId] = msg.sender;

  return bookId;
  }

  // Retrieving the customers
  function getCustomers() public view returns (address[16] memory) {
    return customers;
  }
}
