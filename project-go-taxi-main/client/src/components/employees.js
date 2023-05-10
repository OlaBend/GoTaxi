import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../styles.css"
import { NavLink } from "react-router-dom";



const Employee = (props) => (
    <tr>
        <td>{props.employee.name}</td>
        <td>{props.employee.username}</td>
        <td>{props.employee.email}</td>
        <td>{props.employee.phone}</td>
        <td>{props.employee.earnings}</td>
        <td>{props.employee.rides}</td>
        <td>{props.employee.position}</td>
        <td>
            <Link className="btn btn-link"  to={`/edit/${props.employee._id}`}>Edit</Link> 
            <button className="btn btn-link"
            onClick={() => {
                    props.deleteEmployee(props.employee._id);
                }}
                >
                Delete
            </button>
        </td>
    </tr>
)




export default function EmployeeList(){

    const [ employees, setEmployees ] = useState([])

    //gets employees from database
    useEffect(() => {
        async function getEmployees() {
            const response = await fetch(`http://localhost:5000/employee/`);
            
            if (!response.ok){
                const message = `An Error occured : ${response.statusText}`;
                window.alert(message);
                return;
            }

            const employees = await response.json();
            setEmployees(employees)
        }

        getEmployees();

        return;
    }, [employees.length]);


    // deletes employees
    async function deleteEmployee(id){
        await fetch(`http://localhost:5000/employee/${id}`, { 
            method: "DELETE"
        });

        const newEmployees = employees.filter((el) => el._id !== id);
        setEmployees(newEmployees);
    }


     // maps out the employees on the table
    function employeeList() {
        return employees.map((employee) => {
            return (
                <Employee
                employee={employee}
                deleteEmployee={() => deleteEmployee(employee._id)}
                key={employee._id}
                />
            );
        });
    }



    //returns table with all employees aka home page
    return(
        <div style={{
            margin: "3% 7%",
        }}>
            <NavLink className="nav-link btn" style={{textAlign: "center", fontSize: "3vh"}}  to="/create">
               <button className="btn btn-dark btn-lg" >Create Employee</button> 
             </NavLink>
            <h3 style={{
            color: "white"
          }}>Employee List</h3>
          <table className="table table-dark" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>name</th>
                <th>username</th>
                <th>email</th>
                <th>phone</th>
                <th>earnings</th>
                <th>rides</th>
                <th>position</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>{employeeList()}</tbody>
          </table>
          <div  style={{textAlign: "center", marginTop: "40px"}}>
            <img className="img-fluid grow" 
                src={`${process.env.PUBLIC_URL}/cutedoggo.jpg`} 
                alt="logo"/>
            </div>
        </div>
      );
}
