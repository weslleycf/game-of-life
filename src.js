const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


const resolution = 40 // resolução da area do canvas
canvas.width = 400 // largura do canvas
canvas.height = 400 // altura do canvas

const COLS = canvas.width / resolution  // divisão do canvas pela resolução, resulta em 40 colunas de 10 pixels de largura 
const ROWS = canvas.height / resolution // divisão do canvas pela resolução, resulta em 40 linhas de 10 pixels de altura


// função para criação do grid
function buildGrid(){
    return  new Array(COLS).fill(null) // preenche as colunas com null para poder ser iterado
        .map(() => new Array(ROWS).fill(0)) // preenche cada celula com o valor 0 
}


const grid = buildGrid()

render(grid)

// função para renderização do grid no canvas
function render(grid){
    for (let col = 0; col < grid.length; col++){ // percorre cada coluna
        for (let row = 0; row < grid[col].length; row++){ //percorre cada celula por linha
            const cell  = grid[col][row] // preenche cada celula com o valor correspondente do grid

            ctx.beginPath(); // inicia novo caminho no canvas
            ctx.rect(col * resolution, row * resolution, resolution, resolution) // desenha a celula com os argumentos: posições x e y, largura e altura
            ctx.stroke() // desenha as celulas com bordas
        }
    }
}

