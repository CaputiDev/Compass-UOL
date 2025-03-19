const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const score = document.querySelector(".score-value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const botao = document.querySelector(".play-again");
const posicaoInicial = { x:210, y:210};
const tam = 30;

let direcao, loopId;

let cobra = [posicaoInicial];



const aumentarScore = (pontos) => {
    score.innerText = +score.innerText+pontos;
}

const randomizadorNumero = (min,max) =>{    
    return parseInt(Math.random()* (max - min))+ min;
}

const randomizadorPosicao = () =>{
    const num = randomizadorNumero(0, canvas.width-tam);
    return Math.round(num /30)*30;
}

const comida = {
    x: randomizadorPosicao(),
    y: randomizadorPosicao(),
    cor: "orange",

}

const desenhaComida  = () => {

    const {x,y,cor} = comida;

    ctx.shadowColor = "white"
    ctx.shadowBlur = 6;
    ctx.fillStyle = cor;
    ctx.fillRect(x,y,tam,tam);
    ctx.shadowBlur = 0;

}

const comeComida = () => {
    const head = cobra[cobra.length -1];

    if (comida.x == head.x && comida.y == head.y){
        cobra.push(head);
        
        let x = randomizadorPosicao();
        let y= randomizadorPosicao();
        
        while(cobra.find((posicao) => posicao.x == x && posicao.y == y)){
        x = randomizadorPosicao();
        y = randomizadorPosicao();
        }
        aumentarScore(10);
        comida.x = x;
        comida.y = y;
    }
}

const checarColisao = () => {
    const head = cobra[cobra.length -1];
    const limiteCanvas= canvas.width-tam;
    
    const colisaoParede = head.x <0|| head.x >limiteCanvas||head.y <0|| head.y >limiteCanvas;
    const colisaoCorpo = cobra.find((posicao,index) => {
        return index < cobra.length -2 && posicao.x == head.x && posicao.y == head.y});




    if(colisaoParede || colisaoCorpo){
        gameOver();
        
    }
    
}

const gameOver = () => {
    direcao = null;
    menu.style.display = "flex";
    finalScore.innerText = score.innerText;
    canvas.style.filter = "blur(2px)";

}

const desenhaCobra = () => {
    ctx.fillStyle= "#35824E";

    cobra.forEach((posicao, index) => {
        
        if (index == cobra.length -1){
            ctx.fillStyle= "#52CC7A";
        }
        
        ctx.fillRect(posicao.x,posicao.y, tam, tam);
        
    })
}

const movimentoCobra= () =>{
    if(!direcao){
        return;
    }
    const head = cobra[cobra.length -1];

    
    if(direcao == "direita"){
        cobra.push({x:head.x+tam , y:head.y});

    }
    
    if(direcao == "esquerda"){
        cobra.push({x:head.x-tam , y:head.y});

    }
    
    if(direcao == "cima"){
        cobra.push({x:head.x, y:head.y-tam});

    }
    
    if(direcao == "baixo"){
        cobra.push({x:head.x , y:head.y+tam});

    }
    cobra.shift();
} 

const desenhaGrid = () =>{
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";
    

    for(let i =30; i<canvas.width;  i+=30){
        ctx.beginPath();
        ctx.lineTo(i,0);
        ctx.lineTo(i,600);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0,i);
        ctx.lineTo(600,i);
        ctx.stroke();

        
    }

    ctx.beginPath();
    ctx.lineTo(600,0);
    ctx.lineTo(0,0);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(0,600);
    ctx.lineTo(0,0);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(600,600);
    ctx.lineTo(600,0);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(600,600);
    ctx.lineTo(0,600);
    ctx.stroke();

}

const jogo= (()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clearInterval(loopId);
    
    
    checarColisao();
    movimentoCobra();
    desenhaCobra();
    comeComida();
    desenhaGrid();
    desenhaComida();
    
    


    loopId = setTimeout(()=>{
        jogo();
    },150);

    
})

document.addEventListener("keydown", ({key}) => {
    if(key == "ArrowRight" && direcao != "esquerda"){
        direcao = "direita"
    }
    if(key == "ArrowLeft" && direcao != "direita"){
        direcao = "esquerda"
    }
    if(key == "ArrowDown" && direcao != "cima"){
        direcao = "baixo"
    }
    if(key == "ArrowUp" && direcao != "baixo"){
        direcao = "cima"
    }
    
})

botao.addEventListener("click", () =>{
    score.innerText = "00";
    menu.style.display = "none";
    canvas.style.filter = "none";

    cobra = [posicaoInicial]

    comida.x = randomizadorPosicao();
    comida.y = randomizadorPosicao();

})

jogo();

