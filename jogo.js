var altura = 0;
var largura = 0;
var vida = 1;
var tempo = 25;
var score = 0; // Adiciona a variável de pontuação

var criaZombieTempo = 1000;
var nivel = window.location.search;
nivel = nivel.replace('?', '');

if (nivel === 'facil') {
    criaZombieTempo = 2000;
} else if (nivel === 'medio') {
    criaZombieTempo = 1000;
} else if (nivel === 'dificil') {
    criaZombieTempo = 500;
} else if (nivel === 'extremo') {
    criaZombieTempo = 250;
}

function ajustartamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}
ajustartamanhoPalcoJogo();

var cronometro = setInterval(function() {
    tempo -= 1;
    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaZombie);
        localStorage.setItem('gameScore', score); // Armazena a pontuação
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

function posicaoRandomica() {
    if (document.getElementById('zombie')) {
        document.getElementById('zombie').remove();
        if (vida > 3) {
            localStorage.setItem('gameScore', score); // Armazena a pontuação
            window.location.href = 'game_over.html';
        } else {
            document.getElementById('v' + vida).src = "imagens/coracao_vazio.png";
            vida++;
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    var zombie = document.createElement('img');
    zombie.src = 'imagens/zombie_head.png';
    zombie.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    zombie.style.left = posicaoX + 'px';
    zombie.style.top = posicaoY + 'px';
    zombie.style.position = 'absolute';
    zombie.id = 'zombie';
    zombie.onclick = function() {
        this.remove();
        score += 10; // Incrementa a pontuação
        document.getElementById('game-score').innerHTML = score; // Atualiza a exibição da pontuação
    };

    document.body.appendChild(zombie);
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);
    switch (classe) {
        case 0:
            return 'zombie1';
        case 1:
            return 'zombie2';
        case 2:
            return 'zombie3';
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);
    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}
