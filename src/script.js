const PlayBoard = document.querySelector("#play-board")
const ScoreElement = document.querySelector("#score")
const HighScoreElement = document.querySelector("#high-score")
const Controls = document.querySelectorAll("#controls i")

let gameOver = false
let foodX, foodY
let snakeX = 5, snakeY = 10
let snakeBody = []
let velocityX = 0, velocityY = 0
let setIntervalId
let score = 0

let highestScore = localStorage.getItem("high-score") || 0
HighScoreElement.innerText = `Highest Score: ${highestScore}`

const ChangeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
    InTtGame()
}

const HandleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game Over! Press OK to replay...")
    location.reload()
}

const ChangeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}

Controls.forEach(key => { key.addEventListener("click", () => ChangeDirection({ key: key.dataset.key })) })

const InTtGame = () => {
    if(gameOver) return HandleGameOver()
    let HtmlMarkUp = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY) {
        ChangeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++

        highestScore = score >= highestScore ? score : highestScore
        localStorage.setItem("high-score", highestScore)
        ScoreElement.innerText = `Score: ${score}`
        HighScoreElement.innerText = `Highest Score: ${highestScore}`
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }

    snakeX += velocityX
    snakeY += velocityY

    for (let i = 0; i < snakeBody.length; i++) {
        HtmlMarkUp += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }

    PlayBoard.innerHTML = HtmlMarkUp
}

ChangeFoodPosition()
setIntervalId = setInterval(InTtGame, 125)
document.addEventListener("keydown", ChangeDirection)