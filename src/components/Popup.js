export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._closeButton = this._popup.querySelector('.popup__close-button');

    }

    _closePopupEscHandler(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close()
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupEscHandler.bind(this));
        this._popup.addEventListener('click', this._closeByOverlay.bind(this));
    }
    
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupEscHandler.bind(this));
        this._popup.removeEventListener('click', this._closeByOverlay.bind(this));
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
    }

}