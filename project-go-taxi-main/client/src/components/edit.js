import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

function Edit(){
    // create empty hook 
    const [ form, setForm ] = useState({
        name: "",
        earnings: Number(),
        position: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        rides: Number(),
        isAdmin: Boolean()
    });

    const params = useParams();
    const navigate = useNavigate();
    
    // gets data from backend and check for errors
    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/employee/${id}`);

            if (!response.ok) {
                const message  = `An error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const employee = await response.json();
            if (!employee) {
                window.alert(`Employee with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(employee);
        }

        fetchData();
    }, [params.id, navigate]);

    // updates hook
    function updateForm(value){
        return setForm((prevValue) => {
            return { ...prevValue, ...value}
        });
    }

    // handles submission of the form
    async function onSubmit(e) {
        e.preventDefault();
        const editedEmployee = {
            name: form.name,
            earnings: form.earnings,
            position: form.position,
            username: form.username,
            password: form.password,
            email: form.email,
            phone: form.phone,
            rides: form.rides,
            isAdmin: form.isAdmin
        };

        // send request to update an employee
        await fetch(`http://localhost:5000/employee/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedEmployee),
            headers: {
                "Content-Type": "application/json"
            }
        });
        navigate("/");
    }
        

    


    // Edit page
    return (
        <div style={{
            margin: "3% 7%",
        }}>
            <h3 style={{color: "white"}}>Update Employee</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="position"
                    value={form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={form.username}
                    onChange={(e) => updateForm({ username: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={form.phone}
                    onChange={(e) => updateForm({ phone: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rides">Rides: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="rides"
                    value={form.rides}
                    onChange={(e) => updateForm({ rides: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="earnings">Earnings: </label>
                    <input
                    type="text"
                    className="form-control"
                    id="earnings"
                    value={form.earnings}
                    onChange={(e) => updateForm({ earnings: e.target.value })}
                    />
                </div>
                
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionFalse"
                            value="false"
                            checked={form.isAdmin === "false"}
                            onChange={(e) => updateForm({ isAdmin: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Employee</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionTrue"
                            value="true"
                            checked={form.isAdmin === "true"}
                            onChange={(e) => updateForm({ isAdmin: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Admin</label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Update employee"
                    className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );

}

export default Edit;