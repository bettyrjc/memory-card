const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}
// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

function createCards() {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}
createCards();

// add event listener

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  // aqui se resta porque el array va de 0 a dos, y arriba se le suma para que se 1-3

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = "card active";
  // console.log(cardsEl);

  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});
// Clear cards button
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
