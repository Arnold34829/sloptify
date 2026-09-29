let enLecture = true;
let tempsRestant = 257;
let largeur = 140;
let filtre = "";

let grosBouton = document.querySelector(".bouton_pause");
let petitBouton = document.querySelector(".ctrl_pause i");
let texteTemps = document.querySelector(".temps");
let barre = document.querySelector(".progression");
let recherche = document.querySelector(".nav_texte");
let boutonPlaylists = document.querySelector(".chip_playlists");
let boutonArtistes = document.querySelector(".chip_artistes");


function afficherTemps() {
    let minutes = Math.floor(tempsRestant / 60);
    let secondes = tempsRestant % 60;

    if (secondes < 10) {
        secondes = "0" + secondes;
    }

    texteTemps.innerHTML = "-" + minutes + ":" + secondes;
    barre.style.width = largeur + "px";
}

function changerLecture() {
    if (enLecture == true) {
        enLecture = false;
        grosBouton.classList.remove("fa-circle-pause");
        grosBouton.classList.add("fa-circle-play");
        petitBouton.classList.remove("fa-pause");
        petitBouton.classList.add("fa-play");
    } else {
        enLecture = true;
        grosBouton.classList.remove("fa-circle-play");
        grosBouton.classList.add("fa-circle-pause");
        petitBouton.classList.remove("fa-play");
        petitBouton.classList.add("fa-pause");
    }
}

grosBouton.onclick = changerLecture;
document.querySelector(".ctrl_pause").onclick = changerLecture;


setInterval(function() {
    if (enLecture == false) {
        return;
    }

    if (tempsRestant > 0) {
        tempsRestant = tempsRestant - 1;
        largeur = largeur + 9;
        afficherTemps();
    } else {
        changerLecture();
    }
}, 1000);


recherche.oninput = function() {
    let texte = recherche.value.toLowerCase();
    let lignes = document.querySelectorAll(".titre1");

    for (let i = 0; i < lignes.length; i++) {
        let contenu = lignes[i].innerText.toLowerCase();

        if (contenu.includes(texte)) {
            lignes[i].style.display = "block";
        } else {
            lignes[i].style.display = "none";
        }
    }
}


function filtrerBiblio(type) {
    if (filtre == type) {
        filtre = "";
    } else {
        filtre = type;
    }

    let items = document.querySelectorAll(".lib_item");

    for (let i = 0; i < items.length; i++) { 
        if (filtre == "" || items[i].classList.contains(filtre)) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }

    boutonPlaylists.style.backgroundColor = "#141414";
    boutonPlaylists.style.color = "white";
    boutonArtistes.style.backgroundColor = "#141414";
    boutonArtistes.style.color = "white";

    if (filtre == "playlist") {
        boutonPlaylists.style.backgroundColor = "white";
        boutonPlaylists.style.color = "black";
    }

    if (filtre == "artiste") {
        boutonArtistes.style.backgroundColor = "white";
        boutonArtistes.style.color = "black";
    }
}

boutonPlaylists.onclick = function() {
    filtrerBiblio("playlist");
}

boutonArtistes.onclick = function() {
    filtrerBiblio("artiste");
}


/* place holder backend striper version sans backend juste front end design */
