/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  ButtonGroup,
} from "reactstrap";
import ModalUtils from "../Utility/modal";
import EmployeeModalContent from "../Content/employeeModalContent";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Datatable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const MySwal = withReactContent(Swal);

const Employee = () => {
  const [fullname, setfullname] = useState("");
  const [gender, setgender] = useState("");
  const [tabledata, settabledata] = useState();
  const [isSearch,setisSearch] = useState(false);
  useEffect(() => {
    return (!isSearch) ? getEmployee() : console.log('searching');
  }, [tabledata]);
  ///event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target.elements.fullname.value;
    const gender = e.target.elements.gender.value;
    const id = "EMP-" + Math.floor(Math.random() * 10000);
    axios
      .post("http://localhost:3001/employee/registerEmployee", {
        employee_id: id,
        fullname: fullname,
        gender: gender,
      })
      .then((response) => {
        if (response) {
          MySwal.fire({
            title: "Success",
            text: response.data.msg,
            icon: "success",
          });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: "Error",
          text: error.response.data.msg,
          icon: "error",
        });
      });
  };
  const getEmployee = () => {
    axios
      .get("http://localhost:3001/employee/listEmployee")
      .then((response) => {
        if (response) {
          let table_ = [];
          let tdata = response.data;
          if (tdata.length) {
            for (let i = 0; i < tdata.length; i++) {
              table_.push({
                id: tdata[i].employee_id,
                fn: tdata[i].fullname,
                gn: tdata[i].gender,
                act: action_button(tdata[i]),
              });
            }
          }
          return settabledata(table_);
        }
      }, [])
      .catch((error) => {
        console.log(error);
      });
  };
  const filterEmployee = (e) => {
    setisSearch(true);
    const filterText = e.target.value;
    const filteredData = () => {
      return tabledata.filter(data => data.fn.includes(filterText));
    }
    return settabledata(filteredData());
  };
  const deleteEmployee = (e) => {
    axios
      .post("http://localhost:3001/employee/deleteEmployee", { employee_id: e })
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
  ///utility components
  const employeeModal = (d, v) => {
    return <EmployeeModalContent data={d} view={v}></EmployeeModalContent>;
  };
  const action_button = (data) => {
    return (
      <ButtonGroup>
        <ModalUtils
          btitle="View"
          bcolor="primary"
          mtitle="View Info"
          mfoot={false}
          mbody={() => employeeModal(data, true)}
          msize="md"
          bsize="sm"
        ></ModalUtils>
        <ModalUtils
          btitle="Edit"
          bcolor="success"
          mtitle="Edit Info"
          mfoot={false}
          mbody={() => employeeModal(data, false)}
          msize="md"
          bsize="sm"
        ></ModalUtils>
        <Button
          color="danger"
          type="button"
          onClick={() => deleteEmployee(data.employee_id)}
          size="sm"
        >
          Delete
        </Button>
      </ButtonGroup>
    );
  };
  const Searchbar = () => {
    return (
      <InputGroup className="col-md-4">
        <Input
          type="search"
          className="font-control"
          placeholder="Search"
          onChange={filterEmployee}
        ></Input>
        <Button className="btn btn-md bg-red" onClick={ () => setisSearch(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </InputGroup>
    );
  };
  const table_column = [
    {
      name: "Employee ID#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fn,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gn,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.act,
      sortable: true,
    },
  ];
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Employee</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/home" className="nav-link">
                    <p>Home</p>
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="row">
          <div className="col-md-12"></div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-primary">
                <h3 className="card-title">Employee Form</h3>
              </div>
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="text">Fullname</Label>
                    <Input
                      type="text"
                      name="fullname"
                      id="fullname"
                      required
                      placeholder="Enter Fullname"
                      value={fullname}
                      onChange={(e) => setfullname(e.target.value)}
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
                      value={gender}
                      onChange={(e) => setgender(e.target.value)}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>T-rex</option>
                      <option>Jellyfish</option>
                      <option>Others</option>
                    </Input>
                  </FormGroup>
                  <Button color="primary">Submit</Button>
                </Form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary">
                <h3 className="card-title">Employee List</h3>
              </div>
              <div className="card-body">
                <Datatable
                  title="Employee List"
                  data={tabledata}
                  columns={table_column}
                  defaultSortFieldId
                  pagination={5}
                  className="table table-bordered table-hover table-striped"
                  subHeader
                  subHeaderComponent={Searchbar()}
                ></Datatable>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Employee;
