const Employee = require('../models/db');

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, position, salary, department } = req.body;
        // validate required fields
        if (!name || !email || !position || !salary || !department) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEmployee = new Employee({ name, email, position, salary, department });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: "Error creating employee", error });
    }   
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
};  

// Get a single employee by ID
exports.getEmployee = async (req, res) => {
    try {   
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }   
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error });
    }   
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
    try {   
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error });
    }
};