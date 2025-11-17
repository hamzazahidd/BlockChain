const Blockchain = require("../blockchain/Blockchain");
const { readJSON, writeJSON } = require("../utils/fileHandler");

const deptChainPath = "./backend/data/departmentChains.json";
const classChainPath = "./backend/data/classChains.json";
const studentChainPath = "./backend/data/studentChains.json";

class BlockchainService {

    // -----------------------------
    // Load chains
    // -----------------------------
    static loadDepartmentChains() {
        return readJSON(deptChainPath);
    }

    static loadClassChains() {
        return readJSON(classChainPath);
    }

    static loadStudentChains() {
        return readJSON(studentChainPath);
    }

    // -----------------------------
    // Save chains
    // -----------------------------
    static saveDepartmentChains(chains) {
        writeJSON(deptChainPath, chains);
    }

    static saveClassChains(chains) {
        writeJSON(classChainPath, chains);
    }

    static saveStudentChains(chains) {
        writeJSON(studentChainPath, chains);
    }

    // -----------------------------
    // Department Blockchain
    // -----------------------------
    static createDepartmentChain(departmentId) {
        const chains = this.loadDepartmentChains();

        const chain = new Blockchain();
        chain.createGenesisBlock("0");

        chains.push({
            departmentId,
            chain: chain.chain
        });

        this.saveDepartmentChains(chains);
        return chain.chain;
    }

    static addDepartmentBlock(departmentId, data) {
        const chains = this.loadDepartmentChains();
        const index = chains.findIndex(c => c.departmentId === departmentId);

        const bc = new Blockchain();
        bc.chain = chains[index].chain;

        const newBlock = bc.addBlock(data);

        chains[index].chain = bc.chain;
        this.saveDepartmentChains(chains);

        return newBlock;
    }

    // -----------------------------
    // Class Blockchain
    // -----------------------------
    static createClassChain(classId, deptId) {
        const deptChains = this.loadDepartmentChains();
        const parent = deptChains.find(c => c.departmentId === deptId);

        const prevHash = parent.chain[parent.chain.length - 1].hash;

        const chains = this.loadClassChains();
        const chain = new Blockchain();
        chain.createGenesisBlock(prevHash);

        chains.push({
            classId,
            deptId,
            chain: chain.chain
        });

        this.saveClassChains(chains);
        return chain.chain;
    }

    static addClassBlock(classId, data) {
        const chains = this.loadClassChains();
        const index = chains.findIndex(c => c.classId === classId);

        const bc = new Blockchain();
        bc.chain = chains[index].chain;

        const newBlock = bc.addBlock(data);

        chains[index].chain = bc.chain;
        this.saveClassChains(chains);
        return newBlock;
    }

    // -----------------------------
    // Student Blockchain
    // -----------------------------
    static createStudentChain(studentId, classId) {
        const classChains = this.loadClassChains();
        const parent = classChains.find(c => c.classId === classId);

        const prevHash = parent.chain[parent.chain.length - 1].hash;

        const chains = this.loadStudentChains();
        const chain = new Blockchain();
        chain.createGenesisBlock(prevHash);

        chains.push({
            studentId,
            classId,
            chain: chain.chain
        });

        this.saveStudentChains(chains);
        return chain.chain;
    }

    static addStudentBlock(studentId, data) {
        const chains = this.loadStudentChains();
        const index = chains.findIndex(c => c.studentId === studentId);

        const bc = new Blockchain();
        bc.chain = chains[index].chain;

        const newBlock = bc.addBlock(data);

        chains[index].chain = bc.chain;
        this.saveStudentChains(chains);
        return newBlock;
    }

    // -----------------------------
    // Add attendance block
    // -----------------------------
    static addAttendance(studentId, status, deptId, classId) {
        const blockData = {
            type: "attendance",
            studentId,
            deptId,
            classId,
            status,
            timestamp: Date.now()
        };

        return this.addStudentBlock(studentId, blockData);
    }
}

module.exports = BlockchainService;
