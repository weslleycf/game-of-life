//Configurações básicas 

const canvas = document.querySelector('canvas') // captura o elento canvas
const ctx = canvas.getContext('2d') //configura o contexto do canvas para renderização em 2 dimensões

const canvasHeight = 600 // altura do canvas em pixels
const canvasWidth = 600 // largura do canvas em pixels
const resolution = 8 // tamanho das celulas em pixels


canvas.width = canvasWidth // define a largura do canvas
canvas.height = canvasHeight // define a altura do canvas

const COLS = canvasWidth / resolution // divisão da largura canvas pela resolução para definir a quantidade de colunas
const ROWS = canvasHeight / resolution // divisão da altura do canvas pela resolução para definir a quantidade de linhas


//opções de cores para customização da aparencia
const colors = {
    blue: '#072edb',
    yellow: '#c2d60b',
    red: '#fc2003',
    purple: '#a007a6',
    darkGray: '#2e2e2e',
    lightGray: '#bdbbbd',
    black: '#000000',
    white: '#ffffff'
}

// define a cor que será aplicada para as celulas vivas e mortas
let liveCellColor = colors.purple
let deadCellColor = colors.white


//inicia a aplicação
main()


function main() {
    // constroi o grid inicial
    const grid = buildGrid()


    //atualiza o canvas
    update()

    // função para atualizar o canvas   
    function update() {
        render(nextGen(grid)) // renderiza o grid gerado na nova geração
        requestAnimationFrame(update) //atualiza o animação chamando recursivamente a função update
    }
}

// função para criação do grid
function buildGrid() {
    return new Array(COLS).fill(null) // preenche as colunas com null para poder ser iterado
        .map(() => new Array(ROWS).fill(null) // preenche cada celula com null 
            .map(() => Math.floor(Math.random() * 2))) // preenche cada celula
}

//função para criação da nova geracao do grid
function nextGen(grid) {
    //varivel para retornar o grid da proxima geração atualizado
    let nextGrid;
    const currentGen = grid.map(arr => arr.map(cell => cell))
    for (let col = 0; col < currentGen.length; col++) { // percorre cada coluna
        for (let row = 0; row < currentGen[col].length; row++) { //percorre cada celula por linha
            const cell = currentGen[col][row] // preenche cada celula com o valor correspondente do grid

            //calcula o total de vizinhos da geração atual 
            const numNeighbours = calculateNeighbours(col, row, currentGen)

            //aplica as regras do jogo
            nextGrid = applyRules(cell, numNeighbours, grid, col, row)

        }
    }
    //retorna grid da nova geração
    return nextGrid
}


// função para renderização do grid no canvas
function render(grid) {
    for (let col = 0; col < grid.length; col++) { // percorre cada coluna
        for (let row = 0; row < grid[col].length; row++) { //percorre cada linha
            const cell = grid[col][row] // atribui a cada celula o valor correspondente do grid

            ctx.beginPath(); // inicia novo caminho no canvas
            ctx.rect(col * resolution, row * resolution, resolution, resolution) // desenha a celula com os argumentos: posições x e y, largura e altura
            ctx.fillStyle = cell ? liveCellColor : deadCellColor //se o valor da celula é true recebe o primeiro estilo senão o segundo estilo
            ctx.fill() // desenha as celulas com o preenchimento definido no fillStyle
        }
    }
}

//função para calcular o total de vizinhos de cada celula
function calculateNeighbours(col, row, currentGen) {
    //verificando o valor das celulas vizinhas
    let numNeighbours = 0 // variavel totalizar a quantidade de vizinhos
    for (let i = -1; i < 2; i++) { // percorre as posição das colunas em relação a celula atual de -1 a 1
        for (let j = -1; j < 2; j++) { // percorre as posição das linhas em relação a celula atual de -1 a 1

            // verifica se o vizinho é a celula central, caso true a desconsidera no calculo 
            if (i == 0 && j == 0) {
                continue
            }

            const x_cell = col + i // calcula a posição na coluna
            const y_cell = row + j // calcula a posição na linha


            //verifica se a posição da celula não está no inicio ou fim das colunas e linhas (margens)
            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                let currentNeighbor = currentGen[x_cell][y_cell] //atribui o valor do vizinho atual para a variavel currentNeighbour
                numNeighbours += currentNeighbor // adiciona o valor do currentNeighbour ao total de neighbours
            }

        }
    }

    //retorna o total de vizinhos da celula
    return numNeighbours
}

// aplicando as regras do jogo
function applyRules(cell, numNeighbours, grid, col, row) {
    if (cell && (numNeighbours < 2 || numNeighbours > 3)) // se a celula atual está viva 
    {
        //mata a celula
        grid[col][row] = 0
    }
    // se a celula atual está morta  
    else if (cell === 0 && numNeighbours === 3) {
        //revive a celula
        grid[col][row] = 1
    }

    //retorna o grid com os valores atulizados
    return grid
}