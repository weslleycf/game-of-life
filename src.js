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
console.log(grid)

