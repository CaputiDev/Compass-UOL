function PPT(escolha){
    if(typeof(escolha) == "string"){
    escolha = escolha.toLowerCase().split("").filter(value => value !=" ").join("");
    }
    switch(escolha){
        case "pedra":
        case 1:
            escolha =1;
            console.log("Você escolheu pedra")
            break;
        case "papel":
        case 2:
            console.log("Você escolheu papel")
            escolha=2;
            break;
        case "tesoura":
        case 3:
            console.log("Você escolheu tesoura")
            escolha=3;
            break;
        default:
            escolha =0;
            console.log("Insira um valor válido");
    
        }
    if(escolha !=0){
        let escolhaBot = parseInt(Math.random()*3)+1;
        
        switch(escolhaBot){
        case 1:
            console.log("cpu escolheu pedra");
            break;
        case 2:
            console.log("cpu escolheu papel");
            break;
        case 3:
            console.log("cpu escolheu tesoura");
            break;
        default:
            console.log("OCORREU UM ERRO, TENTE NOVAMENTE");
        
        }

        if(escolha == escolhaBot){
            console.log("Empate!");
        }else if(escolha ==1 && escolhaBot ==2 || escolha == 2 && escolhaBot ==3 || escolha ==3 && escolhaBot ==1){
            console.log("Você perdeu!");
        }else{
            console.log("você ganhou!");
        }
        console.log("");
    }

}