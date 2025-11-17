const ClassService = require('../services/ClassService');

class ClassController {
    static getAll(req, res) { res.json(ClassService.getAllClasses()); }
    static getByDepartment(req, res) { res.json(ClassService.getClassesByDepartment(req.params.deptId)); }
    static create(req, res) { res.json(ClassService.createClass(req.body)); }
    static update(req, res) { res.json(ClassService.updateClass(req.params.id, req.body)); }
    static delete(req, res) { res.json(ClassService.deleteClass(req.params.id)); }
}

module.exports = ClassController;
