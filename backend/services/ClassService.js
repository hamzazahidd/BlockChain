const fs = require('fs');
const file = './data/classes.json';
if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');

function read() { return JSON.parse(fs.readFileSync(file)); }
function write(d) { fs.writeFileSync(file, JSON.stringify(d, null, 2)); }

class ClassService {
    static getAllClasses() { return read(); }

    static getClassById(id) {
        return read().find(c => c.id === id);
    }

    static getClassesByDepartment(deptId) {
        return read().filter(c => c.departmentId === deptId);
    }

    static createClass(data) {
        const classes = read();
        const newClass = { id: Date.now().toString(), name: data.name, section: data.section, departmentId: data.departmentId };
        classes.push(newClass); write(classes);
        return newClass;
    }

    static updateClass(id, data) {
        const classes = read();
        const idx = classes.findIndex(c => c.id === id);
        if (idx === -1) return null;
        classes[idx] = { ...classes[idx], ...data };
        write(classes);
        return classes[idx];
    }

    static deleteClass(id) {
        const classes = read().filter(c => c.id !== id);
        write(classes);
        return true;
    }
}

module.exports = ClassService;
