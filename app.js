document.addEventListener('DOMContentLoaded', () => {

// declaring variables for set-up
const cardBoard = document.querySelector(".cardBoard") // div to store card tiles
let clickedArrName = [] // arr to store names of clicked cards
let clickedArrId = [] // arr to store IDs of clicked cards
let matchedArrId = [] // arr to store cards already matched to its pairs
let clicksLeft = document.querySelector('#clicksLeft') // number of turns left for a player
let timer = document.querySelector('#timer')
let seconds // time limit for countdown timer
let timerFunc // countdown timer
let turnsLeft // countdown for clicks left
let extraClicks // additional turns depending on chosen difficulty
let extraClicksNormal = 6 // setting extra clicks in normal mode
let extraClicksTooltip = document.querySelector('#extraClicksTooltip') // displaying correct info on number of clicks in clicks' tooltip window
extraClicksTooltip.innerHTML = extraClicksNormal 

// declaring variables for game-over
let endGame = document.querySelector('.endGame') //game over screen
let endClicksLeft = document.querySelector('#endClicksLeft') // span to show clicks left
let endTimeLeft = document.querySelector('#endTimeLeft') // span to show time left
let winningImage = document.querySelector('#winningImage') // meme-image for winning screen
let gameOver = document.querySelector('#gameOver') // game over screen
let tryAgain = document.querySelector('#tryAgain') // try again option on end screen
let cardsArr = [] // arr to store card tiles

// list of all cards (normal mode)
let cardsArrNormal = [ 
    {
        name: 'arrow',
        img: 'images/arrow.png'
    },
    {
        name: 'arrow',
        img: 'images/arrow.png'
    },
    {
        name: 'circle',
        img: 'images/circle.png'
    },
    {
        name: 'circle',
        img: 'images/circle.png'
    },
    {
        name: 'hexagon',
        img: 'images/hexagon.png'
    },
    {
        name: 'hexagon',
        img: 'images/hexagon.png'
    },
    {
        name: 'pentahedron',
        img: 'images/pentahedron.png'
    },
    {
        name: 'pentahedron',
        img: 'images/pentahedron.png'
    },
    {
        name: 'rectangle',
        img: 'images/rectangle.png'
    },
    {
        name: 'rectangle',
        img: 'images/rectangle.png'
    },
    {
        name: 'rhombus',
        img: 'images/rhombus.png'
    },
    {
        name: 'rhombus',
        img: 'images/rhombus.png'
    },
    {
        name: 'square',
        img: 'images/square.png'
    },
    {
        name: 'square',
        img: 'images/square.png'
    },
    {
        name: 'star',
        img: 'images/star.png'
    },
    {
        name: 'star',
        img: 'images/star.png'
    },
    {
        name: 'thunder',
        img: 'images/thunder.png'
    },
    {
        name: 'thunder',
        img: 'images/thunder.png'
    },
    {
        name: 'heart',
        img: 'images/heart.png'
    },
    {
        name: 'heart',
        img: 'images/heart.png'
    },
    {
        name: 'triangle',
        img: 'images/triangle.png'
    },
    {
        name: 'triangle',
        img: 'images/triangle.png'
    },{
        name: 'cloud',
        img: 'images/cloud.png'
    },
    {
        name: 'cloud',
        img: 'images/cloud.png'
    }
]
// list of all cards (hard mode)
let cardsArrHard = [ 
    {
        name: 'arrow',
        img: 'images/arrow.png'
    },
    {
        name: 'arrow',
        img: 'images/arrow2.png'
    },
    {
        name: 'circle',
        img: 'images/circle.png'
    },
    {
        name: 'circle',
        img: 'images/circle2.png'
    },
    {
        name: 'hexagon',
        img: 'images/hexagon.png'
    },
    {
        name: 'hexagon',
        img: 'images/hexagon2.png'
    },
    {
        name: 'pentahedron',
        img: 'images/pentahedron.png'
    },
    {
        name: 'pentahedron',
        img: 'images/pentahedron2.png'
    },
    {
        name: 'rectangle',
        img: 'images/rectangle.png'
    },
    {
        name: 'rectangle',
        img: 'images/rectangle2.png'
    },
    {
        name: 'rhombus',
        img: 'images/rhombus.png'
    },
    {
        name: 'rhombus',
        img: 'images/rhombus2.png'
    },
    {
        name: 'square',
        img: 'images/square.png'
    },
    {
        name: 'square',
        img: 'images/square2.png'
    },
    {
        name: 'star',
        img: 'images/star.png'
    },
    {
        name: 'star',
        img: 'images/star2.png'
    },
    {
        name: 'thunder',
        img: 'images/thunder.png'
    },
    {
        name: 'thunder',
        img: 'images/thunder2.png'
    },
    {
        name: 'heart',
        img: 'images/heart.png'
    },
    {
        name: 'heart',
        img: 'images/heart2.png'
    },
    {
        name: 'triangle',
        img: 'images/triangle.png'
    },
    {
        name: 'triangle',
        img: 'images/triangle2.png'
    },{
        name: 'cloud',
        img: 'images/cloud.png'
    },
    {
        name: 'cloud',
        img: 'images/cloud2.png'
    }
]

// starting a game
let start = document.querySelector('.startGame') // adding start screen
start.addEventListener('click', startGame) // removing start screen onclick
function startGame() {
    start.setAttribute('style', 'animation: fadeOut 0.6s')
    setTimeout(() => start.setAttribute('style', "z-index: -3"), 500) 
}
let difficulty = document.querySelector('.difficulty') // adding "choose difficulty" screen
// choosing difficulty by changing arrs for cardboard set-up
let normal = document.querySelector('.normal')
let hard = document.querySelector('.hard')
normal.addEventListener('click', function() {chooseDifficulty(cardsArrNormal, extraClicksNormal)}) // function with parameters was wrapped into anonymous function in order to send it into EventListener 
hard.addEventListener('click', function() {chooseDifficulty(cardsArrHard, 0)})
function chooseDifficulty(arr, num) {
    seconds = 99 // setting time for countdown
    timer.innerHTML = seconds // displaying timer
    timerFunc // starting timer
    cardsArr = arr // defining arr based on difficulty chosen
    extraClicks = num
    setUp() // setting-up
    difficulty.setAttribute('style', 'animation: fadeOut 0.6s')
    setTimeout(() => difficulty.setAttribute('style', 'z-index: -2'), 500) // removing "choose difficulty" screen
}

// setting up the card board
function setUp() {
    cardsArr.sort(() => 0.5 - Math.random()) // randomizing cards
    turnsLeft = cardsArr.length * 2 - 2 + extraClicks/* calculating the minimum amount of clicks
    required to find all matches. Two conditions were taken into considiration:
    1) a player makes no mistakes: 
        - never clicks on one and the same card more than two times (except for the last two revealed cards);
        - always clicks only once on each of the last two revealed cards
    2) the distribution of card tiles is the least beneficial for a player, in particular, 
    for every pair of cards clicked (except for the first two and the last two):
        - first card of a pair is always new (hasn't been in previous pairs);
        - second card of a pair has already been in previous pairs.
    That means - an additonal (second) click is always required for every card (except for the last two cards) to match them all.*/
    clicksLeft.innerHTML = turnsLeft // displaying clicks left before the first click

    // creating the card board from list of all cards
    for (let i = 0; i < cardsArr.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/cover.png')
        card.setAttribute('id', i)
        card.setAttribute('class', 'cardTiles')
        card.setAttribute('style', 'cursor: pointer')
        card.setAttribute('style', 'animation: fadeIn 1s')
        cardBoard.appendChild(card)
        card.addEventListener('click', flip)
    }

    // setting up the timer 
    timerFunc = setInterval(function() {
        if(seconds <= 0) { // defining game over if times out
            clearTimeout(timerFunc)
            if(matchedArrId.length !== cardsArr.length) {
                tryAgainFunc()
                youLose()
            }
        }
        seconds-- // comment c1: determining 1sec step for countdown
        timer.innerHTML = seconds // displaying countdown timer
    }, 1000); // comment c2: determining 1sec step for countdown
}

// flipping a card
function flip() {
    this.removeEventListener('click', flip) // comment a1: line forbids two consecutive clicks on the same card tile
    if(!matchedArrId.includes(this.getAttribute('id'))) {  // line excludes from flip function cards that has already been matched
        turnsLeft-- // decrementing turns left with each click
        clicksLeft.innerHTML = turnsLeft // displaying clicks left after the first click
        // for clicked card: displaying it's image, storing it's name and ID:
        var clickedCardId = this.getAttribute('id')
        this.setAttribute('src', cardsArr[clickedCardId].img)
        clickedArrName.push(cardsArr[clickedCardId].name)
        clickedArrId.push(clickedCardId)
        if(clickedArrName.length === 2) {  // whenever two cards are clicked, execute the match function
            cardBoard.setAttribute('style', 'pointer-events: none') // comment b1: line forbids 3rd click before processing two previous clicks
            setTimeout(match, 500) // for pairs that have no match: timeout function makes the second card visible for short period of time before flipping back
        }
    }
}

// matching two cards:
function match() {
    var cards = document.querySelectorAll('img') // forming an array of all card tiles
    if (clickedArrName[0] !== clickedArrName[1]) { // no match -> flip back cards
        cards[clickedArrId[0]].setAttribute('src', 'images/cover2.png')
        cards[clickedArrId[1]].setAttribute('src', 'images/cover2.png')
    } else { // match found -> leave the cards face up, add them to the matched arr
        matchedArrId.push(clickedArrId[0])
        matchedArrId.push(clickedArrId[1])
        if(matchedArrId.length === cardsArr.length) { // check for win
            clearTimeout(timerFunc) // stop the timer
            if (extraClicks === 0) {
                winningImage.setAttribute('src', 'images/hardWin.gif') // display winning image
            } else {
                winningImage.setAttribute('src', 'images/normalWin.png') // display winning image
            }
            tryAgainFunc()
            if(turnsLeft === 0) { // display corrent information on endgame screen for clicks and time left
                endClicksLeft.innerHTML = 'You did it last click! 🔥'
                } else {
                endClicksLeft.innerHTML = 'Clicks left: ' + turnsLeft
                }
            if(seconds <= 0) {
                endTimeLeft.innerHTML = 'You did it last second! 🔥'
                } else {
                endTimeLeft.innerHTML = 'Time left: ' + seconds + "s"
                }
        }
    }
    if(turnsLeft === 0 & matchedArrId.length !== cardsArr.length) { // check for gameover if no clicks left
        clearTimeout(timerFunc) // stop the timer
        endClicksLeft.innerHTML = 'No clicks left'  // display the reason for gameover
        tryAgainFunc()
        youLose()
    }
    clickedArrName = []  // clear arr for further matches
    clickedArrId = [] // clear arr for further matches
    cardBoard.setAttribute('style', 'pointer-events: auto') // comment b2: line allows 3rd click after processing two previous clicks
    cards.forEach(x => x.addEventListener('click', flip)) // comment a2: after processing two clicks on two different card tiles, this line allows second click (not consecutive) on the same card tile
}

function tryAgainFunc() {
    endGame.setAttribute('style', 'z-index: 1') // display endgame screen
    tryAgain.innerHTML = "Try again?" // display try again option
    tryAgain.addEventListener('click', retry)
}
function youLose() { 
    gameOver.innerHTML = "GAME OVER"
    if(turnsLeft === 0) { // displaying correct information on end game screen in case both timer and clicks turned zero at the same moment
        endClicksLeft.innerHTML = 'No clicks left'
        } else {
        endClicksLeft.innerHTML = 'Clicks left: ' + turnsLeft
        }
        endTimeLeft.innerHTML = 'Times out'
    if (seconds === 0) { 
        endTimeLeft.innerHTML = 'Times out'
        } else {
        endTimeLeft.innerHTML = 'Time left: ' + seconds + "s"
        }
}

function retry() {
    // reseting parameters: 
    endGame.setAttribute('style', 'z-index: -1')
    difficulty.setAttribute('style', 'z-index: 2')
    start.setAttribute('style', "z-index: 3")
    winningImage.removeAttribute('src')
    clickedArrName = []
    clickedArrId = []
    matchedArrId = []
    gameOver.innerHTML = ''
    endClicksLeft.innerHTML = ''
    endTimeLeft.innerHTML = ''
    cardBoard.setAttribute('style', 'pointer-events: auto')
    // removing previous set-up:
    let images = document.getElementsByClassName('cardTiles') 
    let length = images.length 
    for (let i = 0; i < length; i++) {
        images[0].parentNode.removeChild(images[0]);
    }   
}
})