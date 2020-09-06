import './index.css';
import {initialCards} from '../scripts/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {settings, popup, popupEditProfile, popupNewPlace, popupPhotoZoom, inputName, inputJob, inputLink, inputPlace, popupEditButton, popupAddButton, profileName, profileJob} from '../scripts/utils.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const popupEditProfileValidator = new FormValidator(settings, popupEditProfile);
const popupNewPlaceValidator = new FormValidator(settings, popupNewPlace);

popupEditProfileValidator.enableValidation();
popupNewPlaceValidator.enableValidation();

function addCard(link, name) {
  const card =  new Card(link, name, '.template-card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(addCard(item.link, item.name));
  } 
}, '.grid-elements'); 


const userInfo = new UserInfo( {
  name: profileName,
  job: profileJob
});

const popupWithPhoto = new PopupWithImage(popupPhotoZoom);
popupWithPhoto.setEventListeners();

const profilePopup = new PopupWithForm(popupEditProfile, () => {
  userInfo.setUserInfo(inputName, inputJob);
  profilePopup.close();
});
profilePopup.setEventListeners();

const newPlacePopup = new PopupWithForm (popupNewPlace, () => {
    cardList.addItem(addCard(inputLink.value, inputPlace.value));
    newPlacePopup.close();
  });
newPlacePopup.setEventListeners();

const handleCardClick = (link, name) => {
  popupWithPhoto.open(link, name);
}

cardList.renderItems();
  
popupEditButton.addEventListener('click', () => {
  profilePopup.open();
  const userBio = userInfo.getUserInfo();
  inputName.value = userBio.name;
  inputJob.value = userBio.job;
});

popupAddButton.addEventListener('click', () => {
  newPlacePopup.open();
});