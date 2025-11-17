const Block = require("./Block");
const { mineBlock } = require("./pow");

class Blockchain {
    constructor() {
        this.chain = [];
    }

    createGenesisBlock(prevHash = "0") {
        const block = new Block(
            0,
            Date.now(),
            { genesis: true },
            prevHash,
            0
        );
        block.hash = mineBlock(block);
        this.chain.push(block);
        return block;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(transactions) {
        const prev = this.getLatestBlock();

        const block = new Block(
            this.chain.length,
            Date.now(),
            transactions,
            prev.hash
        );

        block.hash = mineBlock(block);
        this.chain.push(block);
        return block;
    }
}

module.exports = Blockchain;
