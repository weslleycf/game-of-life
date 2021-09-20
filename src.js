const canvas = document.querySelector('canvas') // captura o elento canvas
const ctx = canvas.getContext('2d') //configura o contexto do canvas para renderização em 2 dimensões


const resolution = 8 // resolução da area do canvas
canvas.width = 800   // largura do canvas
canvas.height = 800 // altura do canvas

const COLS = canvas.width / resolution  // divisão do canvas pela resolução para definir a quantidade de colunas
const ROWS = canvas.height / resolution // divisão do canvas pela resolução para definir a quantidade de linhas

// função para criação do grid
function buildGrid(){
    return  new Array(COLS).fill(null) // preenche as colunas com null para poder ser iterado
        .map(() => new Array(ROWS).fill(null) // preenche cada celula com null 
        .map(() => Math.floor(Math.random()*2))) // preenche cada celula
    }


function nextGen(grid){
    //const nextGen = grid.map(arr => [...arr]) // copia o grid inicial para ser atualizado para a a nova geração

    const currentGen = grid.map(arr => arr.map(cell => cell))
    for (let col = 0; col < currentGen.length; col++){ // percorre cada coluna
        for (let row = 0; row < currentGen[col].length; row++){ //percorre cada celula por linha
            const cell  = currentGen[col][row] // preenche cada celula com o valor correspondente do grid
         
            //verificando o valor das celulas vizinhas
            let numNeighbours = 0 // variavel para somar a quantidade de vizinhos
            for (let i = -1; i< 2; i++){ // percorre as posição das colunas em relação a celula atual de -1 a 1
             for (let j = -1; j < 2; j++){ // percorre as posição das linhas em relação a celula atual de -1 a 1
                // verifica se o vizinho é a celula central, em caso positivo a desconsidera no calculo 
                if(i==0 && j==0){ 
                     continue
                 } 

                 const x_cell = col + i // calcula a posição na coluna
                 const y_cell = row + j // calcula a posição na linha


                 //verifica se a posição da celula não está no inicio ou fim das colunas e linhas (margens)
                 if (x_cell >= 0 && y_cell >=0 && x_cell < COLS && y_cell < ROWS){
                    let currentNeighbor = currentGen[x_cell][y_cell] //atribui o valor do vizinho atual para a variavel currentNeighbour
                    numNeighbours += currentNeighbor // adiciona o valor do currentNeighbour ao total de neighbours
                 }

                }
             }


             // aplicando as regras do jogo

             
             if (cell && (numNeighbours < 2 || numNeighbours > 3)) // se a celula atual está viva 
             {
                grid[col][row] = 0
            }
            // se a celula atual está morta  
            else if (cell === 0 && numNeighbours === 3 ) {
                 grid[col][row] = 1
            } 
          }
        }
        //retorna grid da nova geração
        return grid
    }

// constroi o grid inicial
let grid = buildGrid()

//atualiza a animação
requestAnimationFrame(update)

//atualiza a o grid e recursivamente atualiza a animação
function update(){
    render(nextGen(grid)) // renderiza o grid
    requestAnimationFrame(update) //atualiza o animação

}
// função para renderização do grid no canvas
function render(grid){
    for (let col = 0; col < grid.length; col++){ // percorre cada coluna
        for (let row = 0; row < grid[col].length; row++){ //percorre cada celula por linha
            const cell  = grid[col][row] // preenche cada celula com o valor correspondente do grid

            ctx.beginPath(); // inicia novo caminho no canvas
            ctx.rect(col * resolution, row * resolution, resolution, resolution) // desenha a celula com os argumentos: posições x e y, largura e altura
            ctx.fillStyle = cell ? 'blue' : 'white' //se o valor da celula é true recebe valor 'black' senão 'white'
            ctx.fill() // desenha as celulas com o preenchimento definido no fillStyle
        }
    }
}



