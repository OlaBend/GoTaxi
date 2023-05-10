import React, { useState } from "react"
import { useNavigate } from "react-router";



function Create(){

    // creating hook with null values
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

    const navigate = useNavigate();

    // Updates hook values
    function updateForm(value){
        return setForm((prevValue) => {
            return { ...prevValue, ...value};
        });
    }

    // handles form submission
    async function onSubmit(e){
        e.preventDefault();
        
        // catches hook values
        const newPerson = { ...form};

        // send form values to the backend
        await fetch(`http://localhost:5000/employee`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        // updates hook back to null
        setForm({
            name: "",
            earnings: Number(""),
            position: "",
            username: "",
            password: "",
            email: "",
            phone: "",
            rides: Number(""),
            isAdmin: Boolean()
        });

        // redirects to home page
        navigate("/")
    }

    // create page
    return(
        <div style={{
            margin: "3% 7%",
        }}>
            <h3 style={{color: "white"}}>Create New Employee</h3>
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
                    value="Create employee"
                    className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default Create;