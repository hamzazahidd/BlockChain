const fs = require('fs');
const file = './data/students.json';
if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');

function read() { return JSON.parse(fs.readFileSync(file)); }
function write(d) { fs.writeFileSync(file, JSON.stringify(d, null, 2)); }

class StudentService {
    static getAllStudents() { return read(); }

    static getStudentById(id) {
        return read().find(s => s.id === id);
    }

    static getStudentsByClass(classId) {
        return read().filter(s => s.classId === classId);
    }

    static createStudent(data) {
        const students = read();
        const newStudent = {
            id: Date.now().toString(),
            name: data.name,
            roll: data.roll,
            classId: data.classId,
            departmentId: data.departmentId
        };
        students.push(newStudent); write(students);
        return newStudent;
    }

    static updateStudent(id, data) {
        const students = read();
        const idx = students.findIndex(s => s.id === id);
        if (idx === -1) return null;
        students[idx] = { ...students[idx], ...data };
        write(students);
        return students[idx];
    }

    static deleteStudent(id) {
        const students = read().filter(s => s.id !== id);
        write(students);
        return true;
    }
}

module.exports = StudentService;
