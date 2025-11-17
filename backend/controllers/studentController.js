const StudentService = require('../services/StudentService');

class StudentController {
    static getAll(req, res) { res.json(StudentService.getAllStudents()); }
    static getByClass(req, res) { res.json(StudentService.getStudentsByClass(req.params.classId)); }
    static create(req, res) { res.json(StudentService.createStudent(req.body)); }
    static update(req, res) { res.json(StudentService.updateStudent(req.params.id, req.body)); }
    static delete(req, res) { res.json(StudentService.deleteStudent(req.params.id)); }
}

module.exports = StudentController;
