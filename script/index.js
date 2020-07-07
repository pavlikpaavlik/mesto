const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');
const formSubmit = form.querySelector('.popup__save');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job');
let inputName = form.querySelector('.popup__input_value_name');
let inputJob = form.querySelector('.popup__input_value_job');

function togglePopup() {
    if (popup.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;    
        inputJob.value = profileJob.textContent;
    }
    popup.classList.toggle('popup_opened'); 
}

function formSubmitHandler (event) {
    event.preventDefault();

    let editedName = inputName.value;
    let editedJob = inputJob.value;

    profileName.textContent = editedName;
    profileJob.textContent = editedJob;

    togglePopup();
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
form.addEventListener('submit', formSubmitHandler);