const { Client } = require("pg");



const client = new Client({
    host: "localhost",
    port:5432,
    user: 'postgres',
    password: '******',
    database:'my_contact'
});


exports.query= async (query,values)=>{
    const {rows} = await client.query(query,values)
    return rows
}

client.connect().then(() => console.log('Conexão com banco de dados estabelecida'));


