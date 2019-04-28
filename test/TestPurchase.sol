pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Purchase.sol";

contract TestPurchase {
  // The address of the purchase contract to be tested
  Purchase purchase = Purchase(DeployedAddresses.Purchase());

  // Testing the purchase() function
  function testUserCanBuyBook() public {
    uint returnedId = purchase.purchase(expectedBookId);

    Assert.equal(returnedId, expectedBookId, "Purchase of the expected book should match what is returned.");
  }

  // Testing retrieval of a single book's customer
  function testGetCustomerAddressByBookId() public {
    address customer = purchase.customers(expectedBookId);

    Assert.equal(customer, expectedCustomer, "Buyer of the expected book should be this contract.");
  }

  // Testing retrieval of all book customers
  function testGetCustomerAddressByBookIdInArray() public {
    //Store customers in memory rather than contract's storage
    address[16] memory customers = purchase.getCustomers();

    Assert.equal(customers[expectedBookId], expectedCustomer, "Buyer of the expected book should be this contract.");
  }

  // The id of the book that will be used for testing
  uint expectedBookId = 3;

  // The expected buyer of book is this contract
  address expectedCustomer = address(this);

}
