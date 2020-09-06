export default class Card {
    constructor(link, name, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        const elementName = this._element.querySelector('.grid-element__title');
        elementName.textContent = this._name;
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

    _setEventListeners() {
        this._element.querySelector('.grid-element__photo').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    
        this._element.querySelector('.grid-element__trash').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.grid-element__like-button').addEventListener('click', this._likeCard);
    }
}
