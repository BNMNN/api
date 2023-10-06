const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_api',
  });

async function selectClientes(){
    const results = await connection.query("SELECT * FROM usuarios");
    return results[0];
}

async function selectCliente(id){
    const results = await connection.query("SELECT * FROM usuarios WHERE id=?", [id]);
    return results[0];
}

async function insertCliente(cliente){
    const values = [cliente.nome, cliente.idade];
    await connection.query("INSERT INTO usuarios(nome,idade) VALUES (?,?,?)", values);
}

async function updateCliente(id, cliente){
    const values = [cliente.nome, cliente.idade, id];
    await connection.query("UPDATE usuarios SET nome=?, idade=? WHERE id=?", values);
}

function deleteCliente(id){
    const index = usuarios.findIndex(c => c.id === id);
    usuarios.splice(index, 1);
}

module.exports = {
    selectClientes,
    selectCliente,
    insertCliente,
    updateCliente,
    deleteCliente
}