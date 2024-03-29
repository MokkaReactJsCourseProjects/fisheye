//Imports
import { photographerList } from '../utils/domLinker.js';
import { createDomElement } from '../utils/domGenerator.js';
import formatPrice from '../utils/formatPrice.js';
import { interractibleAddEventListener } from '../utils/keyboard.js';
import { photographerTotalLikes } from '../utils/domLinker.js';

//Return a photographer object
export function photographerFactory(data) {
    const { name, portrait, city, country, id, price, tagline } = data;

    const displayedName = name;
    const displayedPortrait = `assets/photographers/${portrait}`;
    const displayedLocation = `${city}, ${country}`;
    const displayedTagline = tagline;
    const displayedPrice = formatPrice(price);

    function getCardDOM() {
        const domParent = photographerList;
        const domCard = createDomElement('li', domParent);
        domCard.setAttribute('class', 'photographer_card');

        const domLink = createDomElement('a', domCard);
        domLink.setAttribute('href', 'photographer.html?id=' + id);
        domLink.setAttribute('aria-label', displayedName);
        interractibleAddEventListener(domLink, () => {
            const link = domLink.getAttribute('href');
            location.href = link;
        });

        const domPortraitContainer = createDomElement('div', domLink);
        domPortraitContainer.setAttribute('class', 'photographer_thumbnail-container');

        const domPortrait = createDomElement('img', domPortraitContainer);
        domPortrait.setAttribute('src', displayedPortrait);
        domPortrait.setAttribute('class', 'zoomable');
        domPortrait.setAttribute('draggable', false);
        domPortrait.setAttribute('alt', '');

        const domName = createDomElement('h2', domLink);
        domName.setAttribute('class', 'photographer_name');
        domName.textContent = displayedName;

        const domLocation = createDomElement('p', domLink);
        domLocation.setAttribute('class', 'photographer_location');
        domLocation.textContent = displayedLocation;

        const domTagline = createDomElement('p', domLink);
        domTagline.setAttribute('class', 'photographer_tagline');
        domTagline.textContent = displayedTagline;

        const domPrice = createDomElement('p', domLink);
        domPrice.setAttribute('class', 'photographer_price');
        domPrice.textContent = displayedPrice;
    }

    function displayTotalLikes(medias) {
        let likes = 0;
        medias.forEach((media) => {
            likes += media.likes;
        });
        photographerTotalLikes.textContent = likes;
    }

    return { getCardDOM, displayTotalLikes, displayedName, displayedPortrait, displayedLocation, displayedTagline, displayedPrice };
}
