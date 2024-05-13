"use strict";


function showRandomImageAtStart() {
    const thumbnailLinks = document.querySelectorAll('#thumbnails .card-link');
    const randomIndex = getRandomInt(0, thumbnailLinks.length);
    const randomLink = thumbnailLinks[randomIndex];
    const imageUrl = randomLink.getAttribute('href');
    const imageDescription = randomLink.querySelector('img').getAttribute('alt');
    switchFullImage(imageUrl, imageDescription);
    const cardBody = randomLink.parentElement.querySelector('.card-body');
    cardBody.classList.add('bg-dark', 'text-white');
}


function prepareLinks() {
    const thumbnailLinks = document.querySelectorAll('#thumbnails .card-link');
    thumbnailLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const currentCard = document.querySelector('.card-body.bg-dark.text-white');
            if (currentCard) {
                currentCard.classList.remove('bg-dark', 'text-white');
            }
            const cardBody = this.parentElement.querySelector('.card-body');
            cardBody.classList.add('bg-dark', 'text-white');
            const imageUrl = this.getAttribute('href');
            const imageDescription = this.querySelector('img').getAttribute('alt');
            switchFullImage(imageUrl, imageDescription);
            const key = imageUrl; // Using image URL as the key
            loadNotes(key);
            event.preventDefault();
        });
    });
}


function storeNotes() {
    const notesField = document.getElementById('notes');
    notesField.addEventListener('blur', function() {
        const key = getCurrentImageUrl();
        const notes = this.innerText.trim();
        if (notes !== '') {
            localStorage.setItem(key, notes);
        } else {
            localStorage.removeItem(key);
        }
    });
}


function switchFullImage(imageUrl, imageDescription) {
    const fullImage = document.querySelector('#fullImage img');
    fullImage.setAttribute('src', imageUrl);
    fullImage.setAttribute('alt', imageDescription);
    const caption = document.querySelector('#fullImage figcaption');
    caption.textContent = imageDescription;
}


function loadNotes(key) {
    const notesField = document.getElementById('notes');
    const notes = localStorage.getItem(key);
    notesField.innerText = notes ? notes : 'Enter your notes here!';
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function getCurrentImageUrl() {
    const fullImage = document.querySelector('#fullImage img');
    return fullImage.getAttribute('src');
}

// Initialize the gallery
showRandomImageAtStart();
prepareLinks();
storeNotes();
