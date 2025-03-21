function verificarPrimo(numero){
    let contador = 0;
    if(isNaN(numero)){
        return console.log("Entrada inválida");
    }
    for(i=1;i<=numero;i++){
        if(numero % i ==0){
            contador++;
            
        }
    }
    if(contador == 2){
        console.log(numero +" é primo");
        return true;
    }else{
        console.log(numero +" não é primo")
        return false;
    }
}


//função para o HTML/CSS
function verificar() {
    let numero = parseInt(document.getElementById("numero").value);
    let resultado = verificarPrimo(numero);
    if(isNaN(numero)){
        document.getElementById("resultado").innerText = "Insira um valor, por favor";
    }else{
        resultado ? document.getElementById("resultado").innerText = `O ${numero} é primo!` : document.getElementById("resultado").innerText = `O ${numero} não é primo!`;
        
    }
}