const DepartmentService = require('../services/DepartmentService');

class DepartmentController {
    static getAll(req, res) { res.json(DepartmentService.getAllDepartments()); }
    static create(req, res) { res.json(DepartmentService.createDepartment(req.body)); }
    static update(req, res) { res.json(DepartmentService.updateDepartment(req.params.id, req.body)); }
    static delete(req, res) { res.json(DepartmentService.deleteDepartment(req.params.id)); }
}

module.exports = DepartmentController;
