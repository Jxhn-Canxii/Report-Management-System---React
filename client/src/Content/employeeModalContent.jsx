/** @format */
import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const EmployeeModalContent = (props) => {
  const [eid] = useState(props.data.employee_id);
  const [efullname, esetfullname] = useState(props.data.fullname);
  const [egender, esetgender] = useState(props.data.gender);
  const [eview] = useState(props.view);


  const updateEmployee = (e) => {
    e.preventDefault();
    const fullname = e.target.elements.fullname.value;
    const gender = e.target.elements.gender.value;
    const id = e.target.elements.id.value;
    axios
      .post("http://localhost:3001/employee/updateEmployee", {
        employee_id: id,
        fullname: fullname,
        gender: gender,
      })
      .then((response) => {
        MySwal.fire({
          title: "Success",
          text: response.data.msg,
          icon: "success",
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: "Error",
          text: error.response.data.msg,
          icon: "error",
        });
      });
  };
  const eForm = () =>{
    return(
      <Form onSubmit={updateEmployee}>
      <FormGroup>
        <Label for="text">Fullname</Label>{props.success}
        <Input type="text" name="id" id="id" required readOnly value={eid} />
      </FormGroup>
      <FormGroup>
        <Label for="text">Fullname</Label>
        <Input
          type="text"
          name="fullname"
          id="fullname"
          required
          placeholder="Enter Fullname"
          value={efullname}
          onChange={(e) => esetfullname(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="text">Gender</Label>
        <Input
          name="gender"
          className="form-control"
          id="gender"
          required
          type="select"
          value={egender}
          onChange={(e) => esetgender(e.target.value)}
        >
          <option>Male</option>
          <option>Female</option>
          <option>T-rex</option>
          <option>Jellyfish</option>
          <option>Others</option>
        </Input>
      </FormGroup>
      <Button color="primary" className="float-right">
        Submit
      </Button>
    </Form>
    )
  }
  const eInfo = () =>{
    return (
      <div>
        <div className="col-md-12">
          <Label className="text-red">Employee ID:</Label>
          <h5>{eid}</h5>
        </div>
        <div className="col-md-12">
          <Label className="text-red">Fullname:</Label>
          <h5>{efullname}</h5>
        </div>
        <div className="col-md-12">
          <Label className="text-red">Gender:</Label>
          <h5>{egender}</h5>
        </div>
      </div>
    );
  }
  return ((!eview) ? eForm() : eInfo());
};
export default EmployeeModalContent;
