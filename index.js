require("dotenv").config();
const db = require("./db")
const express = require("express");

const app = express();

app.use(express.json());

app.delete("/usuarios/:id", (request, response) => {
    const id = parseInt(request.params.id);
    db.deleteCliente(id);
    response.sendStatus(204);
})

app.patch("/usuarios/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const clientes = request.body;
    db.updateCliente(id, clientes);
    response.sendStatus(200);
})

app.post("/usuarios", async (request, response) => {
    const clientes = request.body;
    await db.insertCliente(clientes);
    response.sendStatus(201);
})

app.get("/usuarios/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const results = await db.selectCliente(id);
    response.json(results);
})

app.get("/usuarios", async (request, response) => {
    const results = await db.selectClientes();
    response.json(results);
})

app.get("/", (request, response) => {
    response.json(
        {message:"WORKS"}
    )
})

app.listen(process.env.PORT, () => {
    console.log("APP funcionando");
});