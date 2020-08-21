import {popupsToggle} from './utils.js';

const popupPhotoZoom = document.querySelector('.popup_photo-zoom');
const popupPhoto = popupPhotoZoom.querySelector ('.popup__photo');
const popupName = popupPhotoZoom.querySelector ('.popup__place');

export default class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.grid-element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const elementPhoto = this._element.querySelector('.grid-element__photo');
        this._element.querySelector('.grid-element__title').textContent = this._name;
        elementPhoto.src = this._link;
        elementPhoto.alt = this._name;

        return this._element
    }
    
    _likeCard(evt) {
        const like = evt.target.closest('.grid-element__like-button');
        like.classList.toggle('grid-element__like-button_theme_black');
      }

    _deleteCard() {
        this._element.remove(); 
        this._element = null;
      }

    _photoZoomPopup() {
        popupPhoto.src = this._link;
        popupName.textContent = this._name;
        popupsToggle(popupPhotoZoom);
    }

    _setEventListeners() {
        this._element.querySelector('.grid-element__photo').addEventListener('click', (evt) => {
            evt.preventDefault();
            this._photoZoomPopup();
        });
    
        this._element.querySelector('.grid-element__trash').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.grid-element__like-button').addEventListener('click', this._likeCard);
    }
}
