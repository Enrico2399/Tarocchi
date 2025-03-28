const cards = [
    { name: "Il Matto", description: "Rappresenta l'inizio di un viaggio, l'innocenza, la spontaneità e l'imprevedibilità.", image: "img\\Folle0.jpeg" },
    { name: "Il Mago", description: " Simboleggia la volontà, la creatività, la consapevolezza e il potere di manifestare i propri obiettivi.", image: "img\\Mago1.jpeg" },
    { name: "La Papessa", description: "Rappresenta la saggezza intuitiva, la conoscenza segreta, il mistero e la femminilità.", image: "img\\Papessa2.jpeg" },
    { name: "L'Imperatrice", description: "Simboleggia la fertilità, la creatività, l'abbondanza e il potere femminile.", image: "img\\Imperatrice3.jpeg" },
    { name: "L'Imperatore", description: "Rappresenta l'autorità, la protezione, la stabilità e la razionalità.", image: "img\\Imperatore4.jpeg" },
    { name: "Il Papa", description: "Simboleggia la tradizione, la saggezza spirituale, l'istruzione e la guida spirituale.", image: "img\\Papa5.jpeg" },
    { name: "Gli Amanti", description: "Rappresenta l'amore, la scelta, l'armonia e l'unione dei contrari.", image: "img\\Amanti6.jpeg" },
    { name: "Il Carro", description: "Simboleggia il controllo, la determinazione, il successo e il progresso.", image: "img\\Carro7.jpeg" },
    { name: "La Giustizia", description: "Rappresenta l'equilibrio, la verità, la legge e la responsabilità.", image: "img\\Giustizia8.jpeg" },
    { name: "L'Eremita", description: "Simboleggia la saggezza interiore, la ricerca spirituale, la solitudine e l'illuminazione.", image: "img\\Eremita9.jpeg" },
    { name: "La Ruota", description: "Rappresenta il destino, il cambiamento, la fortuna e i cicli della vita.", image: "img\\RuotaDellaFortuna10.jpeg" },
    { name: "La Forza", description: "Simboleggia il coraggio, la determinazione, il controllo e la compassione.", image: "img\\Forza11.jpeg" },
    { name: "L'Appeso", description: "Rappresenta la sospensione, la rinuncia, la prospettiva e l'accettazione.", image: "img\\Appeso12.jpg" },
    { name: "La Morte", description: "Simboleggia la trasformazione, il cambiamento, la rinascita e il superamento.", image: "img\\Morte13.jpeg" },
    { name: "La Temperanza", description: "Rappresenta l'equilibrio, l'armonia, la moderazione e l'integrazione.", image: "img\\Temperanza14.jpg" },
    { name: "Il Diavolo", description: "Simboleggia l'oscurità, la tentazione, l'oppressione e la prigionia.", image: "img\\Diavolo15.jpeg" },
    { name: "La Torre", description: "Rappresenta la distruzione, la rovina, la rivelazione improvvisa e la liberazione.", image: "img\\Torre16.jpeg" },
    { name: "La Stella", description: "Simboleggia la speranza, l'ispirazione, la rinascita e la guarigione.", image: "img\\Stelle17.jpeg" },
    { name: "La Luna", description: "Rappresenta l'illusione, l'incertezza, l'inconscio e l'intuizione.", image: "img\\Luna18.jpeg" },
    { name: "Il Sole", description: "Simboleggia la felicità, la gioia, l'abbondanza e l'illuminazione spirituale.", image: "img\\Sole19.jpeg" },
    { name: "Il Giudizio", description: "Rappresenta il risveglio, la rinascita, la redenzione e il giudizio finale.", image: "img\\Giudizio20.jpeg" },
    { name: "Il Mondo", description: "Simboleggia il completamento, il successo, l'unità e l'armonia universale.", image: "img\\Mondo21.jpeg" },
    
    // Add other card details here
];

const cardElements = document.querySelectorAll('.card');
const generateBtn = document.getElementById('generateBtn');

generateBtn.addEventListener('click', function() {
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    cardElements[0].querySelector('h2').innerText = shuffledCards[0].name;
    cardElements[0].querySelector('img').src = shuffledCards[0].image;
    cardElements[0].querySelector('p').innerText = shuffledCards[0].description;

    cardElements[1].querySelector('h2').innerText = shuffledCards[1].name;
    cardElements[1].querySelector('img').src = shuffledCards[1].image;
    cardElements[1].querySelector('p').innerText = shuffledCards[1].description;

    cardElements[2].querySelector('h2').innerText = shuffledCards[2].name;
    cardElements[2].querySelector('img').src = shuffledCards[2].image;
    cardElements[2].querySelector('p').innerText = shuffledCards[2].description;

    cardElements[3].querySelector('h2').innerText = shuffledCards[3].name;
    cardElements[3].querySelector('img').src = shuffledCards[3].image;
    cardElements[3].querySelector('p').innerText = shuffledCards[3].description;
});