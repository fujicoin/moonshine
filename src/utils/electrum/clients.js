class Clients {
	constructor() {
		this.coin = "bitcoin";
		this.mainClient = {
			bitcoin: false,
			litecoin: false,
			bitcoinTestnet: false,
			litecoinTestnet: false,
			baricoin: false,
			fujicoin: false,
			monacoin: false
		};
		this.peer = {
			bitcoin: { port: 0, host: "", protocol: "" },
			litecoin: { port: 0, host: "", protocol: "" },
			bitcoinTestnet: { port: 0, host: "", protocol: "" },
			litecoinTestnet: { port: 0, host: "", protocol: "" },
			baricoin: { port: 0, host: "", protocol: "" },
			fujicoin: { port: 0, host: "", protocol: "" },
			monacoin: { port: 0, host: "", protocol: "" }
		};
		this.peers = {
			bitcoin: [],
			litecoin: [],
			bitcoinTestnet: [],
			litecoinTestnet: [],
			baricoin: [],
			fujicoin: [],
			monacoin: []
		};
		this.subscribedAddresses = {
			bitcoin: [],
			litecoin: [],
			bitcoinTestnet: [],
			litecoinTestnet: [],
			baricoin: [],
			fujicoin: [],
			monacoin: []
		};
		this.subscribedHeaders = {
			bitcoin: false,
			litecoin: false,
			bitcoinTestnet: false,
			litecoinTestnet: false,
			baricoin: false,
			fujicoin: false,
			monacoin: false
		};
	}
	
	updateCoin(coin) {
		this.coin = coin;
	}
	
	updateMainClient(mainClient) {
		this.mainClient = mainClient;
	}
	
	updatePeer(peer) {
		this.peer = peer;
	}
	
}

module.exports = new Clients();
