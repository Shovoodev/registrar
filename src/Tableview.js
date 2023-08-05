import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export default function Tableview() {
  const [array, setArray] = useState([]);
  const [bolin, setBolin] = useState(false);
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
  }
  function deletedata(i) {
    let total = [...array];
    total.splice(i, 1);
    setArray(total);
    localStorage.setItem("students", JSON.stringify(total));
  }
  function undateData(i) {
    let { name, number, classView } = array[i];
    setInputdata({ name, number, classView });
    setBolin(true);
    setIndex(i)
  }
  function updateinfo() {
    let total = [...array];
    total.splice(index, 1, { name, number, classView });
    setArray(total);
    setBolin(false);
    localStorage.setItem("students", JSON.stringify(total));
    setInputdata({ name: "", number: "", classView: "" });
  }

  useEffect(() => {
    localStorage.setItem(addinputdata, JSON.stringify(data));
  }, []);

  return (
    
    <div className="field">
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
        
        name="name" type="text" value={name}  placeholder="enter name" onChange={data}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control  size="sm" name="number" type="text" value={number}  placeholder="enter name" onChange={data}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control  size="sm" name="classView" type="text" value={classView}  placeholder="enter name" onChange={data}/>
      </Form.Group>
      </Form>
      <Button variant="secondary" size="lg" onClick={!bolin ? addinputdata : updateinfo}>
        {!bolin ? `Add data` : `Update data`}</Button>

      <br />

      <Table class="table table-bordered">
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
                    {" "}
                    <button
                      onClick={() => {
                        deletedata(i);
                      }}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>{" "}
                  </td>
                  <td>
                    {" "}
                    <button onClick={() => undateData(i)}> <i class="fa-solid fa-pen-to-square"></i></button>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
