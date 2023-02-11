import Employee from "../models/employee.js";

/* REGISTER EMPLOYEE */
export const registerEmployee = async (req, res) => {
  try {
    const {
      employee_id,
      fullname,
      gender,
    } = req.body;


    const newEmployee = new Employee({
      employee_id,
      fullname,
      gender,
    });
    const saveEmployee = await newEmployee.save();
    res.status(201).json(saveEmployee);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const listEmployee = async (req, res) => {
  try {
    const listEmployees = await Employee.find({});
    res.status(200).json(listEmployees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
export const filterEmployee = async (req, res) => {
  try {
    const { filter } = req.body;
    const filterEmployees = await Employee.find({ "$**": filter });
    res.status(200).json(filterEmployees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const {
      employee_id,
    } = req.body;


    const newEmployee = new Employee({
      employee_id,
    });
    const listEmployees = await Employee.deleteOne({employee_id});
    res.status(200).json(listEmployees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
/* UPDATE EMPLOYEE */
export const updateEmployee = async (req, res) => {
  try {
    const {
      employee_id,
      fullname,
      gender,
    } = req.body;


    const newEmployee = new Employee({
      employee_id,
      fullname,
      gender,
    });
    const updateEmployees = await Employee.updateOne({employee_id:employee_id},{fullname : fullname,gender: gender});
    res.status(201).json(updateEmployees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
