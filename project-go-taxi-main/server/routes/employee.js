import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// gets a list of all the employees
router.get("/", async (req, res) => {
    let collection = await db.collection("employees");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});


// gets a single employee by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("employees");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


// creates a new employee
router.post("/", async (req, res) => {
    let newDocument = {
        name: req.body.name,
        earnings: req.body.earnings,
        position: req.body.position,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        rides: req.body.rides,
        isAdmin: Boolean(req.body.isAdmin)
    };
    let collection = await db.collection("employees");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(200);
});


// updates an employee by id
router.patch("/:id", async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
    const updates= {
        $set: {
            name: req.body.name,
            earnings: req.body.earnings,
            position: req.body.position,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            rides: req.body.rides,
            isAdmin: req.body.isAdmin
        }
    };

    let collection = await db.collection("employees");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});


// deletes an employee by id
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    let collection = await db.collection("employees");
    let result =  await collection.deleteOne(query);
    
    res.send(result).status(200);
});


export default router;