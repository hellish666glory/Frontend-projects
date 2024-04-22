document.addEventListener("DOMContentLoaded", () => {
    createGame();
})

function countTime(duration) {
    const timer = createTimer();
    document.body.append(timer.timer)
    requestAnimationFrame(function(starttime) {
        let last = null;
        function frame(delta) {
            let timeleft = Math.floor(duration - (delta - starttime)/1000),
            minutes = Math.floor(timeleft/60),
            seconds = timeleft%60;
            if( timeleft >= 0) {
                if( last != timeleft) {
                    timer.timer.textContent = "Осталось времени: "+minutes+" минут "+seconds+" секунд";
                    last = timeleft;
                }
                requestAnimationFrame(frame);
            } if (minutes === 0 && seconds === 0) {
                alert('Вы не успели :( \nПопробуйте снова')
                endGame();
            }
        }
        frame(starttime);

    });
}

function endGame(){
    const game = document.querySelector('.game');
    const timer = document.querySelector('.timer');
    game.remove();
    timer.remove();
}

function createNumbersArray(count) {
    let pairsArr = [];
    for (let i = 0; i < (count*count)/2; i++){
        let number1 = i + 1;
        let number2 = number1;
        pairsArr.push(number1, number2);
    }
    return pairsArr;
}

function shuffle(arr) {
    for (let i in arr){
        let j = Math.floor(Math.random()*arr.length)
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    };
    return arr
}

function startGame(count) {
    let cardCount = shuffle(createNumbersArray(count));
    return cardCount;
}

function gameComplete(){
    if ((document.querySelectorAll('li#cardmatch').length === 16 && document.querySelector('#cards16')) || (document.querySelectorAll('li#cardmatch').length === 36 && document.querySelector('#cards36' === true)) || (document.querySelectorAll('li#cardmatch').length === 64 && document.querySelector('#cards64') === true) || (document.querySelectorAll('li#cardmatch').length === 100 && document.querySelector('#cards100') === true)){
        if(confirm('Поздравляем!!!\nНачать новую игру?')){
            endGame();
        }
    }
}

function setPlayingField(){
    let numberOfCards = document.querySelectorAll('li.card').length;
    let cardDeck = document.querySelector('ul');
    if (numberOfCards === 16){
        cardDeck.id = 'cards16';   
    }
    if (numberOfCards === 36){
        cardDeck.id = 'cards36';
    }
    if (numberOfCards === 64){
        cardDeck.id = 'cards64';
    }
    if (numberOfCards === 100){
        cardDeck.id = 'cards100';
    } 
}

function createGameTitle(title){
    let gameTitle = document.createElement('h2');
    gameTitle.setAttribute('class', 'header-title');
    gameTitle.innerHTML = title;
    return gameTitle;
}

function createGameStarter(){
    const starter = document.createElement('form');
    starter.setAttribute('class', 'starter flex');
    const input = document.createElement('input');
    input.setAttribute('class','input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');
    button.setAttribute('class', 'btn-reset btn')

    input.placeholder = 'Количество карточек по вертикали/горизонтали';
    button.textContent = 'Начать игру';
    button.disabled = true;

    buttonWrapper.append(button)
    starter.append(input)
    starter.append(buttonWrapper)

    input.addEventListener('input', () => {
        if (input.value === ''){
            button.setAttribute('disabled', true);
        } else {
            button.removeAttribute('disabled');
        }
    });

    return {
        starter,
        input, 
        button
    }
}

function createTimer(){
    const inputTimer = document.createElement('input');
    const timer = document.createElement('span');
    timer.classList.add('timer');

    return{
        inputTimer,
        timer
    }
}

function createDeck(){
    const cardDeck = document.createElement('ul');
    cardDeck.setAttribute('class', 'cardDeck flex list-reset');
    return cardDeck;
}

function createCard(num){
    const card = document.createElement('li');
    const cardNumberContent = document.createElement('span');
    card.setAttribute('id', 'cardclose')
    card.setAttribute('class', 'card flex');
    cardNumberContent.setAttribute('id', 'number');
    cardNumberContent.setAttribute('class', 'cardNumber')
    cardNumberContent.textContent = num;
    card.append(cardNumberContent);

    return card
}

function createGame(title = 'Игра в пары'){
    let pairsGameTitle = createGameTitle(title);
    let pairsGameStarter = createGameStarter();
    const pairsGameTimer = createTimer();
    pairsGameTimer.inputTimer.placeholder = 'Введите время в секундах'
  

    document.body.append(pairsGameTitle);
    document.body.append(pairsGameStarter.starter);
    pairsGameStarter.starter.append(pairsGameTimer.inputTimer);


    pairsGameStarter.starter.addEventListener('submit', (e) => {
        e.preventDefault();
        const defaultCardValue = 4;
        const defualtTimerValue = 60;
        if (!pairsGameStarter.input.value.trim() && !pairsGameTimer.inputTimer.value.trim()){
            return;
        };
        if ((pairsGameStarter.input.value % 2 !== 0) || !(pairsGameStarter.input.value <= 10 & pairsGameStarter.input.value >= 2) || pairsGameStarter.input.value === 0 ){
            pairsGameStarter.input.value = defaultCardValue;

        }
        if (!pairsGameTimer.inputTimer.value.trim()){
            pairsGameTimer.inputTimer.value = defualtTimerValue;
        }

        countTime(pairsGameTimer.inputTimer.value);

        let pairsGameDeck = createDeck();

        pairsGameDeck.classList.add('game');
        let gameRunning = document.querySelector('.game');
        if (gameRunning !== null){
            if (confirm('Вы точно хотите начать новую игру?')){
                endGame();
            }
        }
        document.body.append(pairsGameDeck);

        let cardCount = startGame(pairsGameStarter.input.value);


        for (let cardContent of cardCount){
            let card = createCard(cardContent);
            pairsGameDeck.append(card);
        }

        let numArr = [];
        const allCards = document.querySelectorAll('li')
        allCards.forEach((card) => {
            card.addEventListener('click',() => {
                if(card.id === 'cardclose'){
                    card.id = 'cardopen';
                    let cardNumber = card.querySelector('span').textContent;
                    if (numArr.length === 0){
                        numArr.push(cardNumber);
                        console.log(numArr)
                    }else if (numArr.length === 1 && numArr[0] === cardNumber){
                        const matchedCards  = document.querySelectorAll('#cardopen');
                        matchedCards.forEach((card) => {
                            card.id = 'cardmatch'
                            let clone = card.cloneNode(true);
                            card.replaceWith(clone);
                        });
                        numArr = [];
                    } else{
                        setTimeout(() => {
                            const openedCards = document.querySelectorAll('#cardopen');
                            openedCards.forEach((card) => {
                                card.id = 'cardclose'
                            });
                            numArr = [];
                        }, 750);
                    }    
                }
                gameComplete();  
            });     
        });

        pairsGameStarter.input.value = '';
        pairsGameTimer.inputTimer.value = '';

        setPlayingField();
    });
}
