const cards = [
    "Il Matto",
    "Il Bagatto",
    "La Papessa",
    "L'Imperatrice",
    "L'Imperatore",
    "Il Papa",
    "Gli Amanti",
    "Il Carro",
    "La Giustizia",
    "L'Eremita",
    "La Ruota Della Fortuna",
    "La Forza",
    "L'Appeso",
    "La Morte",
    "La Temperanza",
    "Il Diavolo",
    "La Torre",
    "La Stella",
    "La Luna",
    "Il Sole",
    "Il Giudizio",
    "Il Mondo"
];

const cardElements = document.querySelectorAll('.card');
const generateBtn = document.getElementById('generateBtn');

generateBtn.addEventListener('click', function() {
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    cardElements[0].innerText = shuffledCards[0]; // Situation
    cardElements[1].innerText = shuffledCards[1]; // Challenge
    cardElements[2].innerText = shuffledCards[2]; // Advice
    cardElements[3].innerText = shuffledCards[3]; // Solution
});