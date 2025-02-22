input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // Exibe saudação
    basic.showString("Hello, " + playerName)
    basic.showIcon(IconNames.Heart)
    // Toca som de saudação
    music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once);
})
input.onButtonPressed(Button.A, function () {
    playerName = "" + playerName + "A"
    basic.showString(playerName)
})
// Lista de obstáculos (posição x e y)
// Inicia uma melodia personalizada em loop
function playCustomMelody () {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    music.playTone(294, music.beat(BeatFraction.Quarter))
    music.playTone(330, music.beat(BeatFraction.Quarter))
    music.playTone(349, music.beat(BeatFraction.Quarter))
    music.playTone(392, music.beat(BeatFraction.Quarter))
    music.playTone(440, music.beat(BeatFraction.Quarter))
    music.playTone(494, music.beat(BeatFraction.Quarter))
    music.playTone(523, music.beat(BeatFraction.Quarter))
    basic.pause(200)
    // Reinicia a melodia
    playCustomMelody()
}
// Exibe a pontuação ao pressionar A+B
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Yes)
    basic.showString("Score: " + score)
})
input.onButtonPressed(Button.B, function () {
    playerName = "" + playerName + "B"
    basic.showString(playerName)
})
let score = 0
let playerName = ""
// Lista de obstáculos (posição x e y)
let obstacles: { x: number, y: number }[] = []
// Define a posição inicial do jogador e variáveis do jogo
// Posição do jogador na linha inferior
let playerX = 2
// Pontuação do jogador
// Indica se o jogo está rodando
let gameRunning = true
playCustomMelody()
// Pergunta o nome do jogador e permite que ele construa com os botões
basic.showIcon(IconNames.Happy)
basic.showString("Nome?")
// Loop principal do jogo
basic.forever(function () {
    // Se o jogo acabou, para a execução
    if (!(gameRunning)) {
        return;
    }
    // Limpa a tela
    basic.clearScreen()
    // Desenha o jogador na parte inferior
    led.plot(playerX, 4)
    obstacles = obstacles.map(obstacle => ({ x: obstacle.x, y: obstacle.y + 1 })).filter(obstacle => obstacle.y < 5);
// Exibe os obstáculos
    obstacles.forEach(obstacle => led.plot(obstacle.x, obstacle.y));
// Verifica colisão entre o jogador e os obstáculos
    if (obstacles.some(obstacle => obstacle.y === 4 && obstacle.x === playerX)) {
        gameRunning = false
        basic.showIcon(IconNames.Skull)
        // Exibe mensagem de fim de jogo
        basic.showString("Game Over")
        // Toca som de derrota
        music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once);
// Reinicia o Micro:bit
        control.reset()
    }
    // Gera novos obstáculos aleatoriamente
    if (Math.randomRange(0, 4) < 2) {
        obstacles.push({ x: Math.randomRange(0, 4), y: 0 })
    }
    // Aumenta a pontuação
    score += 1
    // O jogo acelera com o tempo
    basic.pause(400 - Math.min(score, 300))
})
