const emojis = ["🐶", "🐱", "🦊", "🐸", "🐼", "🐰", "🐻", "🐯"];
let cards = [...emojis, ...emojis]; // Duplicate for matching
let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let pairsMatched = 0;
let moves = 0;

const board = document.querySelector(".game-board");
const pairsMatchedDisplay = document.getElementById("pairs-matched");
const totalMovesDisplay = document.getElementById("total-moves");
const resetBtn = document.getElementById("reset");

function shuffleCards() {
    shuffledCards = cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = "";
    shuffleCards();
    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-index", index);
        card.textContent = "🔲";
        card.addEventListener("click", handleCardClick);
        board.appendChild(card);
    });
}

function handleCardClick(event) {
    const card = event.target;
    const index = card.getAttribute("data-index");

    if (card.classList.contains("revealed") || firstCard && secondCard) return;

    card.textContent = shuffledCards[index];
    card.classList.add("revealed");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        moves++;
        totalMovesDisplay.textContent = moves;
        
        if (firstCard.textContent === secondCard.textContent) {
            pairsMatched++;
            pairsMatchedDisplay.textContent = pairsMatched;
            firstCard = secondCard = null;
        } else {
            setTimeout(() => {
                firstCard.textContent = "🔲";
                secondCard.textContent = "🔲";
                firstCard.classList.remove("revealed");
                secondCard.classList.remove("revealed");
                firstCard = secondCard = null;
            }, 1000);
        }
    }
}

resetBtn.addEventListener("click", () => {
    firstCard = secondCard = null;
    pairsMatched = 0;
    moves = 0;
    pairsMatchedDisplay.textContent = "0";
    totalMovesDisplay.textContent = "0";
    createBoard();
});

createBoard();