
// Select Random card --- f(selectCard)
//display total ---      f(UpdateScore)
//check if less than 21 --f(checkIf21)
//when click on stand Dealer plays -- f(clickStand)
//New game when Deal is clicked --f(clickedDeal)
//Dealclicked - check score and display winner----- f(winner)
//Updating the table f(table)



document.querySelector('#hit-btn').addEventListener('click', selectCard);
document.querySelector('#deal-btn').addEventListener('click', clickedDeal);
document.querySelector('#stand-btn').addEventListener('click', clickStand);

let currentPlayer = 'you'
let players = ['you', 'dealer']

const playerBoxes = ['#query-score-you', '#query-score-dealer']
let finalScore = {'you' : 0, 'dealer':0}
let result = {'win':0, 'loose':0, 'draw':0}

let newScore = 0
let sound = new Audio("sounds/swish.m4a");
let soundaww = new Audio('sounds/aww.mp3')
let soundstap = new Audio('sounds/stap.mp3')

function selectCard(){

    sound.play()
    document.getElementById('stand-btn').disabled = false;
    genNum = randomNumGen()
    let cardImage = document.createElement('img');
    cardImage.src = `images/${genNum}.png` ;
    cardImage.id = 'images';

    cardImage.height = 150;
    cardImage.width = 150;

    document.querySelector(`#query-score-${currentPlayer}`).appendChild(cardImage);

    updateScore(genNum)

    checkIf21(newScore)

    console.log(newScore)




}

function updateScore(num){
    if (typeof num != 'number') {
        newScore += 10;
        document.querySelector(`#${currentPlayer}-score-board`).textContent = newScore;
        }

    else {
        newScore += parseInt(num);
        document.querySelector(`#${currentPlayer}-score-board`).textContent = newScore;
    }
}


function randomNumGen(){
    num = Math.floor(Math.random()*13)+2;
    if (num > 9) return ['a','j','q','k'][Math.floor(Math.random()*3)];
    else return num
}

function checkIf21(score){
    if (parseInt(score) > 21) {
        document.getElementById('hit-btn').disabled = true;
//        document.getElementById('stand-btn').disabled = true;

        document.querySelector(`#${currentPlayer}-score-board`).textContent = 'Bust!!';
        document.querySelector(`#${currentPlayer}-score-board`).style.color = 'red';
        document.querySelector(`#${currentPlayer}-score-board`).style.fontSize = 'xx-large'
        soundaww.play()

        finalScore[currentPlayer] = 0
    }
    if(parseInt(score)<21){
    finalScore[currentPlayer] = score
    }
}

function clickedDeal(){
    soundstap.play()

    for (i=0; i<2; i++){
        let imagesOfCards = document.querySelector(playerBoxes[i]).querySelectorAll('img')
            for (j=0; j<imagesOfCards.length; j++){
                imagesOfCards[j].remove()
        }
    }
    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stand-btn').disabled = false;


    for(i=0; i<2; i++){
        document.querySelector(`#${players[i]}-score-board`).textContent = '0';
        document.querySelector(`#${players[i]}-score-board`).style.color = 'blue';
        document.querySelector(`#${players[i]}-score-board`).style.fontSize = 'x-large'
    }


    newScore = 0
    document.querySelector("#you-score-board").textContent = newScore;
    currentPlayer = 'you'
}

async function clickStand(){

    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;

    currentPlayer = 'dealer'
    if(newScore>21){
        finalScore['you']= 0}
    else{
        finalScore['you'] = newScore
    }

    newScore = 0
    document.getElementById('hit-btn').disabled = false;

    while (newScore<16){
        selectCard()
        await sleep(1000)
    }
    winner(finalScore)
}


//finalScore['you']
//finalScore['dealer]
function winner(finalScore){
        if(finalScore['you']>finalScore['dealer']){
            result['win'] +=1
            document.querySelector('#wins').textContent = result['win']
            document.querySelector('#play-tag').textContent = 'You Win!!'
            document.querySelector('#play-tag').style.color = 'green'
            }
        else if(finalScore['you']<finalScore['dealer']){
            result['loose'] +=1
            document.querySelector('#looses').textContent = result['loose']
            document.querySelector('#play-tag').textContent = 'You Loose!!'
            document.querySelector('#play-tag').style.color = 'red'
            }
        else{
            result['draw'] +=1
            document.querySelector('#draws').textContent = result['draw']
            document.querySelector('#play-tag').textContent = 'Draw!!'
            document.querySelector('#play-tag').style.color = 'red'
            }

}

function sleep(ms){
    return new Promise(resolve=> {setTimeout(resolve, ms)});
}

