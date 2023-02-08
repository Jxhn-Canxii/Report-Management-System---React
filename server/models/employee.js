import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    gender: {
        type: String,
        required: true,
        min: 4,
        max: 10,
      },
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
