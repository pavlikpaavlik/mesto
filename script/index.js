const openPopupButton = document.querySelector('.profile-info__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');
const formSubmit = form.querySelector('.popup__save');
let profileName = document.querySelector('.profile-info__title');
let profileJob = document.querySelector('.profile-info__job');

function togglePopup() {
    popup.classList.toggle('popup_opened');

}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler (event) {
    event.preventDefault();

    let inputName = form.querySelector('.popup__input_name');
    let inputJob = form.querySelector('.popup__input_job');

    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
}

formSubmit.addEventListener('click', formSubmitHandler);