'use strict';

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

// Joue un tour de jeu complet
function jouerTour() {
    document.write(`<h3>Tour n°${tourActuel}</h3>`);

    let initiativeDragon = lancerDes(10, 6);
    let initiativeJoueur = lancerDes(10, 6);
    let attaquant, defenseur, imageAttaquant, message;

    if (initiativeDragon > initiativeJoueur) {
        attaquant = "dragon";
        defenseur = "joueur";
        imageAttaquant = "dragon-winner.png";
    } else {
        attaquant = "joueur";
        defenseur = "dragon";
        imageAttaquant = "knight-winner.png";
    }

    let degats = lancerDes(3, 6);

    if (attaquant === "dragon") {
        if (niveau === "facile") {
            degats = Math.floor(degats * (1 - getPourcentModif(2, 6)));
        } else if (niveau === "difficile") {
            degats = Math.floor(degats * (1 + getPourcentModif(1, 6)));
        }
        message = `Le dragon prend l'initiative, vous attaque et vous inflige ${degats} points de dommage !`;
    } else {
        if (niveau === "facile") {
            degats = Math.floor(degats * (1 + getPourcentModif(2, 6)));
        } else if (niveau === "difficile") {
            degats = Math.floor(degats * (1 - getPourcentModif(1, 6)));
        }
        message = `Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ${degats} points de dommage !`;
    }

    document.write(`
        <figure class="game-round">
            <img src="images/${imageAttaquant}" alt="${attaquant === 'dragon' ? 'Dragon vainqueur' : 'Chevalier vainqueur'}">
            <figcaption>${message}</figcaption>
        </figure>
    `);

    if (defenseur === "dragon") {
        pvDragon = Math.max(0, pvDragon - degats);
    } else {
        pvJoueur = Math.max(0, pvJoueur - degats);
    }

    let imgJoueur = estCritique(pvJoueur, pvMaxJoueur) ? "knight-wounded.png" : "knight.png";
    let imgDragon = estCritique(pvDragon, pvMaxDragon) ? "dragon-wounded.png" : "dragon.png";

    if (pvJoueur <= 0) imgJoueur = "knight-wounded.png";
    if (pvDragon <= 0) imgDragon = "dragon-wounded.png";

    if (tourActuel > 0) {
        document.write(`
            <div class="game-state">
                <figure class="game-state_player">
                    <img src="images/${imgJoueur}" alt="Chevalier">
                    <figcaption>
                        <progress max="${pvMaxJoueur}" value="${pvJoueur}"></progress>
                        ${pvJoueur > 0 ? pvJoueur + ' PV' : 'Game Over'}
                    </figcaption>
                </figure>
                <figure class="game-state_player">
                    <img src="images/${imgDragon}" alt="Dragon">
                    <figcaption>
                        <progress max="${pvMaxDragon}" value="${pvDragon}"></progress>
                        ${pvDragon > 0 ? pvDragon + ' PV' : 'Game Over'}
                    </figcaption>
                </figure>
            </div>
        `);
    }

    tourActuel++;
}

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

let pvDragon, pvJoueur;
let pvMaxDragon, pvMaxJoueur;
let niveau;
let tourActuel = 1;

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

function demarrerPartie() {
    let choixNiveau;
    do {
        choixNiveau = window.prompt("Choisis le niveau de difficulté (1: Facile, 2: Normal, 3: Difficile):");
    } while (!["1", "2", "3"].includes(choixNiveau));

    switch (choixNiveau) {
        case "1":
            niveau = "facile";
            pvDragon = 100 + lancerDes(5, 10);
            pvJoueur = 100 + lancerDes(10, 10);
            break;
        case "2":
            niveau = "normal";
            pvDragon = 100 + lancerDes(10, 10);
            pvJoueur = 100 + lancerDes(10, 10);
            break;
        case "3":
            niveau = "difficile";
            pvDragon = 100 + lancerDes(10, 10);
            pvJoueur = 100 + lancerDes(7, 10);
            break;
    }

    pvMaxDragon = pvDragon;
    pvMaxJoueur = pvJoueur;

    document.write('<div class="game">');
    document.write('<h2>Que la fête commence !!</h2>');
    document.write(`
        <div class="game-info">
            <p>Niveau choisi: ${niveau}</p>
            <p>Points de vie de départ : </p>
            <p>- Chevalier: ${pvJoueur} | Dragon: ${pvDragon}</p>
        </div>
    `);

    while (pvDragon > 0 && pvJoueur > 0) {
        jouerTour();
    }

    document.write('<footer>');
    document.write('<h3>Fin de la partie</h3>');
    document.write('<figure class="game-end">');

    if (pvDragon <= 0) {
        document.write('<figcaption>Félicitations ! Vous avez vaincu le dragon !</figcaption>');
        document.write('<img src="images/knight-winner.png" alt="Chevalier vainqueur">');
    } else {
        document.write('<figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption>');
        document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
    }

    document.write('</figure>');
    document.write('</footer>');
    document.write('</div>');
}

// Lancer la partie
demarrerPartie();
