import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = document.querySelector('.popup__photo');
        this._name = document.querySelector('.popup__place');
    }

    open(link, name) {
        this._image.src = link;
        this._name.alt = name;
        this._name.textContent = name;

        super.open();
    }
}