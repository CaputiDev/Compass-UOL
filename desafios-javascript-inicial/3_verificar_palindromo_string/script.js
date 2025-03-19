function verificarPalindromo(string){
    let textoLimpo = string.toLowerCase().split("").filter(value => value !=" ");
    let textoInverso = textoLimpo.slice().reverse().join("");
    textoLimpo = textoLimpo.join("");
    return textoLimpo == textoInverso;
}


//função para o HTML/CSS
function verificar() {
    let texto = document.getElementById("texto").value;
    let resultado = verificarPalindromo(texto) ? "É um palíndromo!" : "Não é um palíndromo!";
    document.getElementById("resultado").innerText = resultado;
}