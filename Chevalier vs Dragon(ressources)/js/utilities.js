'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/


// Fonction pour lancer n dés à x faces
function lancerDes(n, x) {
    let somme = 0;
    // On lance n dés et on additionne les résultats
    for (let i = 0; i < n; i++) {
        // Math.random() donne un nombre entre 0 et 1, donc *x donne entre 0 et x
        // +1 permet d'avoir un nombre entre 1 et x inclus
        somme += Math.floor(Math.random() * x) + 1;
    }
    return somme;
}

// Petite fonction pour calculer un pourcentage de modif
function getPourcentModif(n, x) {
    // Je divise par 100 pour avoir un pourcentage
    return lancerDes(n, x) / 100;
}

// Pour savoir si un perso est dans un état critique
// On dira que c'est le cas s'il a moins de 30% de ses PV
function estCritique(pv, pvMax) {
    return pv < (pvMax * 0.3);
}