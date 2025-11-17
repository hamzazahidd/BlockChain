const crypto = require("crypto");

class Block {
    constructor(index, timestamp, transactions, prevHash, nonce = 0) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions; // dept/class/student/attendance data
        this.prevHash = prevHash;
        this.nonce = nonce;
        this.hash = this.computeHash();
    }

    computeHash() {
        return crypto
            .createHash("sha256")
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.transactions) +
                this.prevHash +
                this.nonce
            )
            .digest("hex");
    }
}

module.exports = Block;
