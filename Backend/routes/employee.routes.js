const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// ✅ Create Employee (POST)
router.post('/add', async (req, res) => {
    try {
        const { name, employeeNo, jobRole, salary, email, phoneNumber } = req.body;
        
        if (!name || !employeeNo || !jobRole || !salary || !email || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEmployee = new Employee({ name, employeeNo, jobRole, salary, email, phoneNumber });
        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully!", employee: newEmployee });
    } catch (error) {
        console.error("❌ Error adding employee:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Read Employees (GET)
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees" });
    }
});

// ✅ Update Employee (PUT)
router.put('/update/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee" });
    }
});

// ✅ Delete Employee (DELETE)
router.delete('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee" });
    }
});

module.exports = router;
