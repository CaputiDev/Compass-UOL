const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=jorge
// Route params = /curso/node
// Request Body = { nome: 'junior' , tipo: 'humano'}

//CRUD Create, Read, Update, Delete

const cursos = ['JavaScript', 'Java', 'C' , 'Python', 'Node JS', 'Boga'];

//Exibindo a lista dos cursos
server.get('/cursos', (req,res) =>{
    return res.json(cursos);
});

//Exibindo um curso específico
server.get('/cursos/:index',(req,res)=>{
    const {index} = req.params;
    
    return res.json(cursos[+index-1]);
});

//adcionando um curso ao final da lista
server.post('/cursos',(req,res)=>{
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

//Editando o curso
server.put('/cursos/:index', (req,res)=>{
    const {index} = req.params;
    const {name} = req.body;

    cursos[index] = name;

    return res.json(cursos);
})

server.listen( 3000, ()=>{
    console.log(`server running at http://localhost:3000/`);
});