import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Tableview() {
  const [array, setArray] = useState([]);
  const [bool, setBool] = useState(false);
  let [index,setIndex]=useState()
  const [inputdata, setInputdata] = useState({
    name: "",
    number: "",
    classView: ""
  });
  const { name, number, classView } = inputdata;
  function data(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }
  function addinputdata() {
    setArray([...array, { name, number, classView }]);
    setInputdata({ name: "", number: "", classView: "" });
    localStorage.setItem("students",  JSON.stringify([...array, { name, number, classView }]));
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  function deletedata(i) {
    
    let total = [...array];
    total.splice(i, 1);
    
  Swal.fire({
    title: 'Delete!',
    text: 'Entery has been deleted',
    icon: 'error',
  })
    setArray(total);
    localStorage.setItem("students", JSON.stringify(total));
  }
  function undateData(i) {
    let { name, number, classView } = array[i];
    setInputdata({ name, number, classView });
    setBool(true);
    setIndex(i)
  }
  function updateinfo() {
    let total = [...array];
    total.splice(index, 1, { name, number, classView });
    setArray(total);
    setBool(false);
    localStorage.setItem("students", JSON.stringify(total));
    setInputdata({ name: "", number: "", classView: "" });
  }

  useEffect(() => {
    localStorage.setItem(addinputdata, JSON.stringify(data));
  }, []);

  return (
    
    <div class="container">
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
        
        name="name" type="text" value={name}  placeholder="enter name" onChange={data}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Roll Number</Form.Label>
        <Form.Control  size="sm" name="number" type="text" value={number}  placeholder="enter roll number" onChange={data}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Class</Form.Label>
        <Form.Control  size="sm" name="classView" type="text" value={classView}  placeholder="enter class" onChange={data}/>
      </Form.Group>
      </Form>
      <Button variant="secondary" size="lg" onClick={!bool ? addinputdata : updateinfo}>
        {!bool ? `Add data` : `Update data`}</Button>
        <div class="align-middle">
        
        </div>

      <Table striped bordered hover  >
        <tbody>
          <tr className="item">
            <th scope="col">Name</th>
            <th scope="col">Roll Number</th>
            <th scope="col"> Class </th>
            <th scope="col"></th>
            <th scope="col">  </th>
          </tr>
          {array &&
            array.map((item, i) => {
              return (
                <tr scope="row" key={i}>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                  <td> {item.classView}</td>
                  <td>
                    <button
                      onClick={() => { deletedata(i)}} >
                      <i class="fa-solid fa-trash"></i>
                    </button >
                  </td>
                  <td>
                    <button  onClick={() => {undateData(i)}}><i className="fa-solid fa-pen-to-square"></i></button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
