import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input,ButtonGroup } from 'reactstrap';
import ModalUtils from '../Utility/modal';
import EmployeeModalContent from '../Content/employeeModalContent';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Employee = () => {
  const [fullname,setfullname] = useState('');
  const [gender,setgender] = useState('');
  const [tabledata,settabledata] = useState([]);
  useEffect(() => {
    async function getEmployee(){
        axios
          .get("http://localhost:3001/employee/listEmployee")
          .then((response) => {
            if (response) {
              settabledata(response.data);
            }
          }, [])
          .catch((error) => {
            console.log(error);
          });
    }
    getEmployee()
  },[tabledata])

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target.elements.fullname.value;
    const gender = e.target.elements.gender.value;
    const id = 'EMP-' + Math.floor(Math.random() * 10000);
    axios.post('http://localhost:3001/employee/registerEmployee',{ employee_id: id,fullname: fullname,gender: gender })
    .then(response => {
      if(response) {
        MySwal.fire({
          title: "Success",
          text: response.data.msg,
          icon: "success",
        });
      }
    })
    .catch(error => {
      MySwal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    });
  }

  const deleteEmployee = (e) =>{
    axios.post('http://localhost:3001/employee/deleteEmployee',{employee_id : e})
    .then(response => {
      MySwal.fire({
        title: "Success",
        text: response.data.msg,
        icon: "success",
      });
    })
    .catch(error => {
      MySwal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    });
  }
  const employeeModal = (d,v) => {
    return <EmployeeModalContent data={d} view={v} success="true"></EmployeeModalContent>;
  }
  const table = () =>{
      let table_ = [];
      if(tabledata.length){
        for (let i = 0; i < tabledata.length; i++) {
          table_.push(
            <tr key={tabledata[i]._id} className={tabledata[i]._id}>
              <td>{tabledata[i].employee_id}</td>
              <td>{tabledata[i].fullname}</td>
              <td>{tabledata[i].gender}</td>
              <td>
                <ButtonGroup>
                  <ModalUtils
                    btitle="View"
                    bcolor="primary"
                    mtitle="View Info"
                    mfoot={false}
                    mbody={() => employeeModal(tabledata[i],true)}
                    msize="md"
                  ></ModalUtils>
                  <ModalUtils
                    btitle="Edit"
                    bcolor="success"
                    mtitle="Edit Info"
                    mfoot={false}
                    mbody={() => employeeModal(tabledata[i],false)}
                    msize="md"
                  ></ModalUtils>
                  <Button
                    color="danger"
                    type="button"
                    onClick={() => deleteEmployee(tabledata[i].employee_id)}
                    size="md"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        }
      }else{
        table_.push(<tr>
          <td colSpan={3} className='text-red text-center'>No data available!</td>
        </tr>);
      }
      
      return table_
  }
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
                <table className="table table-bordered table-hover table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fullname</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{table()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Employee;
