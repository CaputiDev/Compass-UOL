function somarVetor(vetor){
    var acumulador =0;
    for(i=0;i<vetor.length;i++){
        if(isNaN(vetor[i])){
            return console.log("valor invalido detectado");
        }else{
            acumulador += vetor[i];
        }
    }
    return acumulador;
}


//função para o HTML/CSS
function executarSoma() {
    const input = document.getElementById('inputVetor').value;
    const vetor = input.split(',').map(num => parseFloat(num.trim()));
    const resultado = somarVetor(vetor);
    if(!resultado){
        document.getElementById('resultado').innerText = "Valor inválido detectado";
    }else{
    
    document.getElementById('resultado').innerText = 'Resultado: ' + resultado;
}
}