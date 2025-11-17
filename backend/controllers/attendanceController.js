const AttendanceService = require('../services/AttendanceService');

class AttendanceController {
    static mark(req, res) {
        const { departmentId, classId, studentId, status } = req.body;
        res.json(AttendanceService.markAttendance(departmentId, classId, studentId, status));
    }

    static ledger(req, res) {
        res.json(AttendanceService.getStudentLedger(req.params.studentId));
    }
}

module.exports = AttendanceController;
