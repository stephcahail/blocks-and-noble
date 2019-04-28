var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "zebra wage mass fix zebra oyster grace panel steak hurt travel lumber";

// module.exports = {
//   networks: {
//     ropsten: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/49fda5eedcc446ccab4f7bcae7ba7d8c")
//       },
//       network_id: 3
//     }
//   }
// };

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
