const crypto = require("crypto");

function mineBlock(block, difficulty = 2) {
    const target = "0".repeat(difficulty);
    
    while (block.hash.substring(0, difficulty) !== target) {
        block.nonce++;
        block.hash = block.computeHash();
    }
    
    return block.hash;
}

module.exports = { mineBlock };
