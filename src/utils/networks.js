// https://en.bitcoin.it/wiki/List_of_address_prefixes
const networks = {
	bitcoin: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80
	},
	bitcoinTestnet: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'tb',
		bip32: {
			public: 0x043587cf,
			private: 0x04358394
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef
	},
	litecoin: {
		messagePrefix: '\x19Litecoin Signed Message:\n',
		bech32: 'ltc',
		bip32: {
			public: 0x019da462,
			private: 0x019d9cfe
		},
		pubKeyHash: 0x30,
		scriptHash: 0x32,
		wif: 0xb0
	},
	litecoinTestnet: {
		messagePrefix: '\x18Litecoin Signed Message:\n',
		bech32: 'tltc',
		bip32: {
			public: 0x0436f6e1,
			private: 0x0436ef7d
		},
		pubKeyHash: 0x6f,
		scriptHash: 0x3a,
		wif: 0xef
	},
	baricoin: {
		messagePrefix: '\x19BariCoin Signed Message:\n',
		bech32: 'bari',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x1a,
		scriptHash: 0x15,
		wif: 0x9a
	},
	fujicoin: {
		messagePrefix: '\x19FujiCoin Signed Message:\n',
		bech32: 'fc',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x24,
		scriptHash: 0x10,
		wif: 0xa4
	},
	monacoin: {
		messagePrefix: '\x19Monacoin Signed Message:\n',
		bech32: 'mona',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x32,
		scriptHash: 0x37,
		wif: 0xB0
	}
};

//Max amount of BTC/LTC.
const maxCoins = {
	bitcoin: 2100000000000000,
	bitcoinTestnet: 2100000000000000,
	litecoin: 8400000000000000,
	litecoinTestnet: 8400000000000000,
	baricoin: 1000000000000000000,
	fujicoin: 1000000000000000000,
	monacoin: 10512000000000000
};

//Returns an array of all available coins from the networks object.
const availableCoins = Object.keys(networks).map(coin => coin);

const supportsRbf = {
	bitcoin: true,
	bitcoinTestnet: true,
	litecoin: false,
	litecoinTestnet: false,
	baricoin: true,
	fujicoin: true,
	monacoin: true
};

const zeroValueItems = {
	bitcoin: 0,
	bitcoinTestnet: 0,
	litecoin: 0,
	litecoinTestnet: 0,
	baricoin: 0,
	fujicoin: 0,
	monacoin: 0,
	timestamp: null
};

const arrayTypeItems = {
	bitcoin: [],
	bitcoinTestnet: [],
	litecoin: [],
	litecoinTestnet: [],
	baricoin: [],
	fujicoin: [],
	monacoin: [],
	timestamp: null
};

const objectTypeItems = {
	bitcoin: {},
	bitcoinTestnet: {},
	litecoin: {},
	litecoinTestnet: {},
	baricoin: {},
	fujicoin: {},
	monacoin: {},
	timestamp: null
};

const defaultWalletShape = {
	id: "",
	name: "",
	type: "default",
	addresses: arrayTypeItems,
	addressIndex: zeroValueItems,
	changeAddresses: arrayTypeItems,
	changeAddressIndex: zeroValueItems,
	utxos: arrayTypeItems,
	transactions: arrayTypeItems,
	blacklistedUtxos: arrayTypeItems,
	confirmedBalance: zeroValueItems,
	unconfirmedBalance: zeroValueItems,
	lastUpdated: zeroValueItems,
	hasBackedUpWallet: false,
	walletBackupTimestamp: "",
	keyDerivationPath: {
		bitcoin: "84",
		bitcoinTestnet: "84",
		litecoin: "84",
		litecoinTestnet: "84",
		baricoin: "44",
		fujicoin: "44",
		monacoin: "44"
	},
	coinTypePath: {
		bitcoin: "0",
		bitcoinTestnet: "1",
		litecoin: "2",
		litecoinTestnet: "1",
		baricoin: "810",
		fujicoin: "75",
		monacoin: "22"
	},
	addressType: { //Accepts bech32, segwit, legacy
		bitcoin: "bech32",
		bitcoinTestnet: "bech32",
		litecoin: "bech32",
		litecoinTestnet: "bech32",
		baricoin: "legacy",
		fujicoin: "legacy",
		monacoin: "legacy"
	},
	rbfData: objectTypeItems
};

const getCoinImage = (coin = "bitcoin") => {
	try {
		coin = coin.toLowerCase();
		coin = coin.replace("testnet", "");

		switch (coin) {
			case "bitcoin":
				return require(`../assets/bitcoin.png`);
			case "litecoin":
				return require(`../assets/litecoin.png`);
			case "baricoin":
				return require(`../assets/baricoin.png`);
			case "fujicoin":
				return require(`../assets/fujicoin.png`);
			case "monacoin":
				return require(`../assets/monacoin.png`);
			default:
				return require(`../assets/bitcoin.png`);
		}
	} catch (e) {
		return require(`../assets/bitcoin.png`);
	}
};

const getCoinData = ({ selectedCrypto = "bitcoin", cryptoUnit = "satoshi" }) => {
	try {
		let acronym = "BTC";
		let satoshi = "satoshi";
		let oshi = "sats";
		let blockTime = 10; //min
		switch (selectedCrypto) {
			case "bitcoin":
				acronym = cryptoUnit === "satoshi" ? "sats" : "BTC";
				oshi = "sats";
				return { acronym, label: "Bitcoin", crypto: "BTC", satoshi, oshi, blockTime };
			case "bitcoinTestnet":
				acronym = cryptoUnit === "satoshi" ? "sats" : "BTC";
				oshi = "sats";
				return { acronym, label: "Bitcoin Testnet", crypto: "BTC", satoshi, oshi, blockTime };
			case "litecoin":
				satoshi = "litoshi";
				oshi = "lits";
				acronym = cryptoUnit === "satoshi" ? "lits" : "LTC";
				blockTime = 2.5;
				return { acronym, label: "Litecoin", crypto: "LTC", satoshi, oshi, blockTime };
			case "litecoinTestnet":
				satoshi = "litoshi";
				oshi = "lits";
				acronym = cryptoUnit === "satoshi" ? "lits" : "LTC";
				blockTime = 2.5;
				return { acronym, label: "Litecoin Testnet", crypto: "LTC", satoshi, oshi, blockTime };
			case "baricoin":
				acronym = cryptoUnit === "satoshi" ? "sats" : "BARI";
				blockTime = 1;
				return { acronym, label: "Baricoin", crypto: "BARI", satoshi, oshi, blockTime };
			case "fujicoin":
				acronym = cryptoUnit === "satoshi" ? "sats" : "FJC";
				blockTime = 1;
				return { acronym, label: "Fujicoin", crypto: "FJC", satoshi, oshi, blockTime };
			case "monacoin":
				acronym = cryptoUnit === "satoshi" ? "sats" : "MONA";
				blockTime = 1.5;
				return { acronym, label: "Monacoin", crypto: "MONA", satoshi, oshi, blockTime };
			default:
				acronym = cryptoUnit === "satoshi" ? "sats" : "BTC";
				return { acronym, label: "Bitcoin", crypto: "BTC", satoshi, oshi, blockTime };
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	networks,
	availableCoins,
	defaultWalletShape,
	maxCoins,
	supportsRbf,
	zeroValueItems,
	arrayTypeItems,
	getCoinImage,
	getCoinData
};
