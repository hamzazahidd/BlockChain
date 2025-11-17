const express = require('express');
const cors = require('cors');

try {
    const deptRoutes = require('./routes/departmentRoutes');
    const classRoutes = require('./routes/classRoutes');
    const studentRoutes = require('./routes/studentRoutes');
    const attendanceRoutes = require('./routes/attendanceRoutes');

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/departments', deptRoutes);
    app.use('/classes', classRoutes);
    app.use('/students', studentRoutes);
    app.use('/attendance', attendanceRoutes);

    app.listen(5000, () => console.log("Server running on port 5000"));
} catch (error) {
    console.error("Fatal error:", error.message);
    console.error(error.stack);
    process.exit(1);
}
