import React, { useEffect, useState } from "react";
// import "./styles.css";
export default function Table() {
  const [array, setArray] = useState([]);
  const [index, setIndex] = useState();
  const [bolin, setBolin] = useState(false);
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
    localStorage.setItem(
      "students",
      JSON.stringify([...array, { name, number, classView }])
    );
  }
  function deletedata(i) {
    console.log(i, "this index row want to be delete");
    let total = [...array];
    total.splice(i, 1);
    setArray(total);
    localStorage.setItem("students", JSON.stringify(total));
  }
  function updatedata(i) {
    let { name, number, classView } = array[i];
    setInputdata({ name, number, classView });
    setBolin(true);
    setIndex(i);
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
    const students = JSON.parse(localStorage.getItem("students"));
    setArray(students);
    console.log({ students });
  }, []);
  return (
    <div>
      <input type="text" name="name" placeholder="Enter Name" onChange={data} />
      <input
        type="number"
        name="number"
        placeholder="Enter Number"
        onChange={data}
      />
      <input
        type="text"
        name="classView"
        placeholder="Enter class"
        onChange={data}
      />
      <button onClick={!bolin ? addinputdata : updateinfo}>
        {!bolin ? `Add data` : `Update data`}
      </button>
      <br />
      <table
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center"
        }}
      >
        <tbody>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th> Class </th>
          </tr>
          {array &&
            array.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                  <td>{item.classView} </td>
                  <td>
                    <button onClick={() => updatedata(i)}>update</button>
                  </td>
                  <td>
                    <button onClick={() => deletedata(i)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
