import Employee from "../models/employee.js";

/* REGISTER EMPLOYEE */
export const registerEmployee = async (req, res) => {
  try {
    const {
      fullname,
      gender,
    } = req.body;


    const newEmployee = new Employee({
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
export const deleteEmployee = async (req, res) => {
  try {
    const {
      fullname,
    } = req.body;


    const newEmployee = new Employee({
      fullname,
    });
    const listEmployees = await Employee.deleteOne({fullname});
    res.status(200).json(listEmployees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
/* UPDATE EMPLOYEE */
export const update = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
