const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employeeNo: { type: String, required: true, unique: true },
    jobRole: { type: String, required: true },
    salary: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
