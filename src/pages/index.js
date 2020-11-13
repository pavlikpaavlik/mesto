import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {settings, profileName, profileJob, profileAvatar, popupEditAvatar, popupEditProfile, popupEditProfileButton, nameInput, jobInput, popupNewPlace, popupButtonAvatar, popupButtonNewPlace, popupEditButton, popupAddButton, popupAvatarButton, popupDeletePlace, popupPhotoZoom, initialCards} from '../scripts/utils.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const popupEditProfileValidator = new FormValidator(settings, popupEditProfile);
const popupNewPlaceValidator = new FormValidator(settings, popupNewPlace);
const popupAvatarValidator = new FormValidator(settings, popupEditAvatar);

popupEditProfileValidator.enableValidation();
popupNewPlaceValidator.enableValidation();
popupAvatarValidator.enableValidation();


const imagePopup = new PopupWithImage(popupPhotoZoom);

const userProfile = new UserInfo({
	name: profileName,
	about: profileJob,
	avatar: profileAvatar,
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then((values) => {
		const [userData, items] = values;
		userProfile.setUserData(userData.name, userData.about, userData._id, userData.avatar);
		const initialCardList = new Section(
			{
				items: items,
				renderer: (item) => {
					const card = new Card(
						{
							data: item,
							handleCardClick: globalHandleCardClick,
							handleLikeClick: globalHandleLikeCardClick,
							handleDeleteButtonClick: globalHandleDeleteCardClick,
						},
						userProfile.getUserId(),
						'#template-card',
					);
					const cardElement = card.generateCard();
					initialCardList.setItem(cardElement);
				},
			},
			'.grid-elements',
		);
		initialCardList.renderItems();
	})
	.catch((err) => {
		console.log(err);
	});

const globalHandleCardClick = (data) => {
	imagePopup.open(data);
};

const globalHandleLikeCardClick = (card) => {
	if (card.isLiked()) {
		api
			.dislikeCard(card.id())
			.then((data) => {
				card.setLikesInfo(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	else {
		api
			.likeCard(card.id())
			.then((data) => {
				card.setLikesInfo(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

const globalHandleDeleteCardClick = (card) => {
	confirmPopup.open();
	confirmPopup.handlerSubmit(() => {
		confirmPopup.loading(true);
		api
			.deleteCard(card.id())
			.then((data) => {
				card.deleteElement(data);
				confirmPopup.close();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				confirmPopup.loading(false);
			});
	});
};

const renderCard = (item) => {
	const card = new Card(
		{
			data: item,
			handleCardClick: globalHandleCardClick,
			handleLikeClick: globalHandleLikeCardClick,
			handleDeleteButtonClick: globalHandleDeleteCardClick,
		},
		userProfile.getUserId(),
		'#template-card',
	);
	const cardElement = card.generateCard();
	addCardsList.addItem(cardElement);
	return card;
};

const addCardsList = new Section(
	{
		items: initialCards,
	},
	'.grid-elements',
);

const cardPopup = new PopupWithForm(
	{
		handleFormSubmit: (item) => {
			cardPopup.loading(true);
			api
				.postNewCard(item)
				.then((item) => {
					renderCard(item);
					cardPopup.close();
				})
				.catch((err) => console.log(err))
				.finally(() => {
					cardPopup.loading(false);
				});
		},
	},
	popupNewPlace,
);

const profilePopupEdit = new PopupWithForm(
	{
		handleFormSubmit: ({ name, about }) => {
			profilePopupEdit.loading(true);
			api
				.setUserInfo({
					name: name,
					about: about,
				})
				.then((res) => {
					userProfile.setUserData(res.name, res.about, res._id, res.avatar);
					profilePopupEdit.close();
				})
				.catch((err) => console.log(err))
				.finally(() => {
					profilePopupEdit.loading(false);
				});
		},
	},
	popupEditProfile,
);

const avatarPopup = new PopupWithForm(
	{
		handleFormSubmit: ({ avatar }) => {
			avatarPopup.loading(true);
			api
				.setUserAvatar({
					avatar: avatar,
				})
				.then((res) => {
					userProfile.setUserData(res.name, res.about, res._id, res.avatar);
					avatarPopup.close();
				})
				.catch((err) => console.log(err))
				.finally(() => {
					avatarPopup.loading(false);
				});
		},
	},
	popupEditAvatar,
);


const confirmPopup = new PopupWithConfirm(popupDeletePlace);


imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopupEdit.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

popupAddButton.addEventListener('click', () => {
	cardPopup.open();
	popupNewPlaceValidator.hideAllErrors();
	popupNewPlaceValidator.removeButtonActive(popupButtonNewPlace);
});

popupEditButton.addEventListener('click', () => {
	const profileInfo = userProfile.getUserData();

	nameInput.value = profileInfo.name;
	jobInput.value = profileInfo.about;

	popupEditProfileValidator.hideAllErrors();
	popupEditProfileValidator.addButtonActive(popupEditProfileButton);
	profilePopupEdit.open();
});

popupAvatarButton.addEventListener('click', () => {
	avatarPopup.open();
	popupAvatarValidator.hideAllErrors();
	popupAvatarValidator.removeButtonActive(popupButtonAvatar);
});