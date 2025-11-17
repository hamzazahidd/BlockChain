const Blockchain = require('../blockchain/Blockchain');
const StudentService = require('./StudentService');

class AttendanceService {
    static markAttendance(departmentId, classId, studentId, status) {
        const student = StudentService.getStudentById(studentId);
        if (!student) return null;

        const bc = new Blockchain(departmentId, classId, studentId);
        const block = bc.addBlock({
            departmentId,
            classId,
            studentId,
            studentName: student.name,
            roll: student.roll,
            status,
            timestamp: Date.now()
        });
        bc.save();
        return block;
    }

    static getStudentLedger(studentId) {
        const bc = new Blockchain("", "", studentId);
        return bc.chain;
    }
}

module.exports = AttendanceService;
