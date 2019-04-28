App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load books.
    $.getJSON('../books.json', function(data) {
      var booksRow = $('#booksRow');
      var bookTemplate = $('#bookTemplate');

      for (i = 0; i < data.length; i ++) {
        bookTemplate.find('.panel-title').text(data[i].title);
        bookTemplate.find('img').attr('src', data[i].picture);
        bookTemplate.find('.book-author').text(data[i].author);
        bookTemplate.find('.book-published').text(data[i].published);
        bookTemplate.find('.book-publisher').text(data[i].publisher);
        bookTemplate.find('.btn-buy').attr('data-id', data[i].id);

        booksRow.append(bookTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Purchase.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var PurchaseArtifact = data;
      App.contracts.Purchase = TruffleContract(PurchaseArtifact);

      // Set the provider for our contract
      App.contracts.Purchase.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the purchased books
      return App.markPurchased();
    });

    $.getJSON('Publish.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var PublishArtifact = data;
      App.contracts.Publish = TruffleContract(PublishArtifact);

      // Set the provider for our contract
      App.contracts.Publish.setProvider(App.web3Provider);

      return App.getPublish();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handlePurchase);
  },

  markPurchased: function(customers, account) {
    var purchaseInstance;

    App.contracts.Purchase.deployed().then(function(instance) {
      purchaseInstance = instance;

      return purchaseInstance.getCustomers.call();
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  getPublish: function(publishers, account) {
    var publishInstance;

    App.contracts.Publish.deployed().then(function(instance) {
      publishInstance = instance;

      return publishInstance.getPublishers.call();
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handlePurchase: function(event) {
    event.preventDefault();

    var bookId = parseInt($(event.target).data('id'));

    var purchaseInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Purchase.deployed().then(function(instance) {
        purchaseInstance = instance;

        // Execute purchase as a transaction by sending account
        return purchaseInstance.purchase(bookId, {from: account});
      }).then(function(result) {
        return App.markPurchased();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
