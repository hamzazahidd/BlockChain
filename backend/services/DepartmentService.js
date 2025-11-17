const fs = require('fs');
const file = './data/departments.json';
if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');

function read() { return JSON.parse(fs.readFileSync(file)); }
function write(d) { fs.writeFileSync(file, JSON.stringify(d, null, 2)); }

class DepartmentService {
    static getAllDepartments() { return read(); }

    static getDepartmentById(id) {
        return read().find(d => d.id === id);
    }

    static createDepartment(data) {
        const deps = read();
        const newDept = { id: Date.now().toString(), name: data.name, description: data.description };
        deps.push(newDept); write(deps);
        return newDept;
    }

    static updateDepartment(id, data) {
        const deps = read();
        const idx = deps.findIndex(d => d.id === id);
        if (idx === -1) return null;
        deps[idx] = { ...deps[idx], ...data };
        write(deps);
        return deps[idx];
    }

    static deleteDepartment(id) {
        const deps = read();
        const updated = deps.filter(d => d.id !== id);
        write(updated);
        return true;
    }
}

module.exports = DepartmentService;
