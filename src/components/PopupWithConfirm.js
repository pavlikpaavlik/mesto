import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._formSubmit = this._popupSelector.querySelector('.popup__form_photo-delete');
	}

	handlerSubmit(handlerFormSubmit) {
		this._handleFormSubmit = handlerFormSubmit;
	}

	setEventListeners() {
		super.setEventListeners();
		this._formSubmit.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit();
		});
	}
}