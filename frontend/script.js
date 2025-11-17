const API = "http://localhost:5000";

// Departments
async function createDept() {
    const name = document.getElementById("deptName").value;
    await fetch(`${API}/departments`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name})
    });
    loadDepartments();
}

async function loadDepartments() {
    const res = await fetch(`${API}/departments`);
    const data = await res.json();
    document.getElementById("deptList").innerHTML = data.map(d=>`<p>${d.id} - ${d.name}</p>`).join('');
}
loadDepartments();

// Classes
async function createClass() {
    const name = document.getElementById("className").value;
    const departmentId = document.getElementById("classDeptId").value;
    await fetch(`${API}/classes`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name, departmentId})});
    loadClasses();
}

async function loadClasses() {
    const res = await fetch(`${API}/classes`);
    const data = await res.json();
    document.getElementById("classList").innerHTML = data.map(c=>`<p>${c.id} - ${c.name} (Dept: ${c.departmentId})</p>`).join('');
}
loadClasses();

// Students
async function createStudent() {
    const name = document.getElementById("studentName").value;
    const roll = document.getElementById("rollNum").value;
    const classId = document.getElementById("studentClassId").value;
    const departmentId = document.getElementById("studentDeptId").value;
    await fetch(`${API}/students`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name, roll, classId, departmentId})});
    loadStudents();
}

async function loadStudents() {
    const res = await fetch(`${API}/students`);
    const data = await res.json();
    document.getElementById("studentList").innerHTML = data.map(s=>`<p>${s.id} - ${s.name} (${s.roll})</p>`).join('');
}
loadStudents();

// Attendance
async function markAttendance() {
    const departmentId = document.getElementById("attDept").value;
    const classId = document.getElementById("attClass").value;
    const studentId = document.getElementById("attStudent").value;
    const status = document.getElementById("attStatus").value;

    await fetch(`${API}/attendance`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({departmentId, classId, studentId, status})});
}

// Ledger
async function getLedger() {
    const studentId = document.getElementById("ledgerStudent").value;
    const res = await fetch(`${API}/attendance/ledger/${studentId}`);
    const data = await res.json();
    document.getElementById("ledgerOutput").innerText = JSON.stringify(data, null, 2);
}
