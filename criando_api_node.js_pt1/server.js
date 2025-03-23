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
        const number = url.searchParams.get('number');
        const num = Number(number);
        if(!num|| isNaN(num) || num <0 ){
            response.statusCode = 400;
            return response.end(JSON.stringify({ error: 'Invalid Input'}));
        }else{
            
            function isPrime(num){
                let contador =0;
                for(let i=1;i <=num ; i++){
                    if(num % i ==0){
                        contador++;
                    }
                }
                if(contador ==2){
                    return true;
                }else return false;
            }
            const result = isPrime(num);
            response.statusCode = 200;
            response.end(JSON.stringify({isPrime:result}));
        };
    }else if(request.method === 'POST'){

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