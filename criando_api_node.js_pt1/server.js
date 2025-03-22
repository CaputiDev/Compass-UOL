const {createServer} = require('node:http');
const { URL } = require('node:url');

const host = '127.0.0.1';
const port = 3200;

const server = createServer((request, response) => {
    response.statusCode= 200;
    response.setHeader('content-Type','application/json'); 

    try{

    const url = new URL(request.url, `http://${host}:${port}`);


    if(request.method === 'GET' && url.pathname === '/health-check'){
        response.statusCode=200;
        const now = new Date();
        const timestamp = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        response.end(JSON.stringify({
            success:true, timestamp
        }));
    }else if(request.method === 'GET' && url.pathname === '/is-prime-number'){
        response.statusCode=200;
        
        
    }else{

    response.statusCode = 404;
    response.end(JSON.stringify({error:"Route Not Found"}));
    }
}catch(error){
    console.error(error);
    response.statusCode = 500;
    response.end(JSON.stringify({
        error: 'Internal Server Error'
    }));
}
});
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});