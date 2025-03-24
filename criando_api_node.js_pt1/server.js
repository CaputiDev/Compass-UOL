const { error } = require('node:console');
const {createServer} = require('node:http');
const { json } = require('node:stream/consumers');
const { URL } = require('node:url');

const host = '127.0.0.1';
const port = 3200;

//var globais
let counter = 0;

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
    }else if(request.method === 'POST' && url.pathname === '/count'){
        //curl -X POST http://127.0.0.1:3200/count -H "Content-Type: application/json" -d "{\"incrementBy\": 100}"
        let body = '';
        request.on('data', chunk =>{
            body += chunk.toString();
        });
        request.on('end', () => {
            try{
                const parsedBody = JSON.parse(body);
                const incrementBy = parsedBody.incrementBy;
                if(isNaN(incrementBy) || !Number.isInteger(incrementBy) || incrementBy < 0 ){
                    response.statusCode = 400;
                    return response.end(JSON.stringify({ error: 'Invalid Input'}))
                }else{
                    counter += incrementBy;
                    response.statusCode = 200;
                    return response.end(JSON.stringify({ counter }));
                }
            }catch(error){
                response.statusCode = 400;
                return response.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        })
    }else if(request.method === 'GET' && url.pathname === '/stock-insight'){
        response.statusCode = 200;
        
        let currency = url.searchParams.get('currency') || 'usd';
        
        const apiURL = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`
        
        fetch(apiURL)
        .then(response =>{
            if(!response.ok){
                throw new Error('Erro ao buscar o preço do Bitcoin')
            }
            return response.json();
        })
        .then(data => {
            const price = data.bitcoin[currency];
            
            if(!price){
                throw new Error('Dados inválidos da API');
            }
            const sugestao = priceValidation(price);
            return response.end(JSON.stringify({
                btc_price: price,
                currency,
                sugestao
            }))
            
            
        })
        .catch(error => {
            response.end(JSON.stringify({error: 'erro ao buscar dados'}));

        });
        function priceValidation(price){
            let sugestao;
            if(currency === 'brl'){
                if(price <0){
                throw new Error('Erro no valor do bitcoin');
                }else if(price <300000){
                    return 'Bom momento para compra!';
                }else if(price >300000 && price <450000){
                    return  'Preço razoável. Avalie antes de comprar.'
                }else{
                    return  'Bitcoin está caro. Pode ser melhor esperar.'
                }
            }else if(currency === 'usd'){
                if(price <0){
                    throw new Error('Erro no valor do bitcoin');
                }else if(price <60000){
                    return  'Bom momento para compra!';
                }else if(price >60000 && price <80000){
                    return 'Preço razoável. Avalie antes de comprar.'
                }else{
                    return 'Bitcoin está caro. Pode ser melhor esperar.'
                }
            }else{
                return 'Erro, moeda inserida inválida'
            }
        }
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