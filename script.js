const lettres = 'abcdefghijklmnopqrstuvwxyz';

let lettresArray = Array.from(lettres);

let lettresContainer = document.querySelector('.lettres');

lettresArray.forEach(lettre => {
	let span = document.createElement('span');

	span.appendChild(document.createTextNode(lettre));

	lettresContainer.appendChild(span);

	span.className = 'lettre';
});

// Objet de mots + catégories
const mots = {
	Programmation: ['html', 'javascript', 'css', 'bootstrap', 'php', 'java'],
	Films: [
		'Elvis',
		'House of Gucci',
		'Prestige',
		'Inception',
		'Les Miserables',
		'Parasite',
		'Stalingrad',
		'Memento',
		'Titanic',
	],
	Series: [
		'Emily in Paris',
		'Black Mirror',
		'Dark',
		'Game of thrones',
		'House of Cards',
		'La Revolution',
		'Les Miserables',
		'Lupin',
		'Narcos',
		'Peaky Blinders',
		'Squid Game',
		'Suits',
		'The Crown',
		'Vikings',
		'You',
	],
	Célèbres: [
		'Adele',
		'Albert Einstein',
		'Bill Gates',
		'Brad Pitt',
		'Jeff Bezos',
		'Monica bellucci',
		'Cleopatra',
		'Mahatma Ghandi',
		'Mark Zuckerberg',
		'Maradona',
		'Steve Jobs',
		'Victor Hugo',
	],
	Pays: [
		'Tunisie',
		'Palestine',
		'France',
		'Canada',
		'Brazil',
		'Japon',
		'Ukraine',
		'Chine',
	],
};

// Obtenir une propriété aléatoire
let allKeys = Object.keys(mots);

let randomNumber = Math.floor(Math.random() * allKeys.length);

// Catégorie
let randomName = allKeys[randomNumber];

// Les mots pour chaque catégorie
let randomValue = mots[randomName];

// Le nombre aléatoire dépend des mots
let randomValueNumber = Math.floor(Math.random() * randomValue.length);

// Le mot choisie
let randomValueValue = randomValue[randomValueNumber];

document.querySelector('.jeu-info .categorie span').innerHTML = randomName;

// Sélectionnez l'élément de devinette des lettres
let lettresPropose = document.querySelector('.lettres-proposé');

// Convertir le mot choisi en tableau
let lettresEspace = Array.from(randomValueValue);

// Déclarer un compteur pour compter les nombres des lettres correctes
let winCount = 0;

// Créer des Spans pour contenir les lettres de mot "proposé"
lettresEspace.forEach(lettre => {
	// Créer span vide
	let emptySpan = document.createElement('span');

	// Si il ya un espace entre les lettres
	if (lettre === ' ') {
		emptySpan.className = 'avec-espace';
		winCount++;
	}

	lettresPropose.appendChild(emptySpan);
});

let proposeSpans = document.querySelectorAll('.lettres-proposé span');

// Set les mauvaises Tentatives
let mauvaisesTentatives = 0;

// Selectionner l'élement de motif
let penduMotif = document.querySelector('.pendu-motif');

document.addEventListener('click', e => {
	let Status = false;

	if (e.target.className === 'lettre') {
		e.target.classList.add('clicked');

		// Get lettre "clické"
		let clickedLetter = e.target.innerHTML.toLowerCase();

		// Le mot choisie
		let motChoisie = Array.from(randomValueValue.toLowerCase());

		motChoisie.forEach((motLettre, motIndex) => {
			// Si la lettre "clické" est la meme lettre au mot choisie
			if (clickedLetter == motLettre) {
				Status = true;
				winCount++;

				proposeSpans.forEach((span, spanIndex) => {
					if (motIndex === spanIndex) {
						span.innerHTML = clickedLetter;
					}
				});
			}
		});

		// Si la lettre est faux
		if (Status !== true) {
			// Incrémenter les mauvaises tentatives
			mauvaisesTentatives++;

			penduMotif.classList.add('faux-' + mauvaisesTentatives);

			if (mauvaisesTentatives === 8) {
				perdante();

				lettresContainer.classList.add('fini');
			}
		} else if (winCount == motChoisie.length) {
			gagnant();
		}
	}
});

// Deux fonctions fin du jeu (Résultats)
function perdante() {
	// Créer Popup Div
	let div = document.createElement('div');

	div.appendChild(
		document.createTextNode(
			'Vous avez perdu... Pendu est tué !! Le mot correcte était ' +
				randomValueValue,
		),
	);

	div.className = 'popup-1';

	document.body.appendChild(div);
}

function gagnant() {
	// Créer Popup Div
	let div = document.createElement('div');

	div.appendChild(document.createTextNode('Félicitations !! Vous avez réussi'));

	div.className = 'popup-2';

	document.body.appendChild(div);
}
