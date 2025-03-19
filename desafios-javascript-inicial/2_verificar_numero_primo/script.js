function verificarPrimo(numero){
    if(isNaN(numero)){
        return console.log("Entrada inválida");
    }
    for(i=2;i<numero;i++){
        if(numero % i ==0){
            console.log(numero +" não é primo");
            return false;
        }
    }
    console.log(numero +" é primo");
    return true;
}


//função para o HTML/CSS
function verificar() {
    let numero = parseInt(document.getElementById("numero").value);
    let resultado = verificarPrimo(numero);
    document.getElementById("resultado").innerText = resultado;
}