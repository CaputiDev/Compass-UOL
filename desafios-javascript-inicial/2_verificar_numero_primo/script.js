function verificarPrimo(numero){
    let contador = 0;
    if(isNaN(numero)){
        return console.log("Entrada inválida");
    }
    for(i=1;i<=numero;i++){
        if(numero % i ==0){
            contador++;
            console.log(contador)
            
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
    document.getElementById("resultado").innerText = resultado;
}