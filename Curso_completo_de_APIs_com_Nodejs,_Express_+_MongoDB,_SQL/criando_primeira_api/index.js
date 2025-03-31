const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=jorge
// Route params = /curso/node
// Request Body = { nome: 'junior' , tipo: 'humano'}

//CRUD Create, Read, Update, Delete

const cursos = ['JavaScript', 'Java', 'C' , 'Python', 'Node JS', 'Boga'];


//Middleware global
server.use((req,res,next) => {
    console.log(`URL Chamada${req.url}`);
    return next();
});

//Moddleware local
function checkCurso(req,res,next){
    if(!req.body.name){
        return res.status(400).json({error: `Missing 'name' requisition.body`});
    }

    return next();
}

function checkIndexCurso(req,res,next){
    const curso = cursos[req.params.index];

    if(!curso){
        return res.status(400).json({
            erro: 'Curso não encontrado'
        });
    }
    req.curso = curso;
    return next();
}

//Exibindo a lista dos cursos
server.get('/cursos', (req,res) =>{
    return res.json(cursos);
});

//Exibindo um curso específico
server.get('/cursos/:index', checkIndexCurso,(req,res)=>{    
    return res.json(req.curso);
});

//adcionando um curso ao final da lista
server.post('/cursos', checkCurso,(req,res)=>{
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

//Editando o curso
server.put('/cursos/:index', checkCurso,checkIndexCurso,(req,res)=>{
    const {index} = req.params;
    const {name} = req.body;

    cursos[index] = name;

    return res.json(cursos);
})

//removendo algum curso
server.delete('/cursos/:index',checkIndexCurso, (req,res)=>{
    const {index} =req.params;

    const curso_deletado = cursos[index];

    cursos.splice(+index,1);
    return res.json({menssage: `O curso ${curso_deletado} foi removido com sucesso`})
})


server.listen( 3000, ()=>{
    console.log(`server running at http://localhost:3000/`);
});