import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {
  selectors,
  forms,
  editProfileButton,
  addNewPlaceButton,
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  profilePopup,
  cardPopup,
  cardsGrid,
  imagePopup,
  profileAvatar,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "8609f7f5-114a-489c-ab91-b39ccae89b1d",
    "Content-Type": "application/json",
  },
});
const userInfo = new Userinfo({
  userNameSelector: profileName,
  descriptionSelector: profileDescription,
});
const editProfilePopup = new PopupWithForm(profilePopup, (e, formsData) => {
  e.preventDefault();
  const updatedUserInfo = {
    name: formsData.nameInput,
    about: formsData.descriptionInput,
  };
  api
    .patchProfileInfo(updatedUserInfo)
    .then((res) => userInfo.setUserInfo(res));

  editProfilePopup.close();
});
const createPlaceCardPopup = new PopupWithForm(cardPopup, (e, formsData) => {
  e.preventDefault();
  const cardInfo = {
    name: formsData.placeName,
    link: formsData.imgLink,
  };
  const newCard = new Section(
    { items: cardInfo, renderer: cardRenderer },
    cardsGrid
  );
  newCard.renderItems();
  createPlaceCardPopup.close();
});

const openProfilePopup = () => {
  profileNameInput.value = userInfo.getUserInfo().userName;
  profileDescriptionInput.value = userInfo.getUserInfo().description;
  editProfilePopup.open();
};
const openCardPopup = () => {
  createPlaceCardPopup.open();
};

forms.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});

api.fetchUserInfo().then((res) => {
  userInfo.setUserInfo(res);
  profileAvatar.src = res.avatar;
});
api.getCardsfromServer().then((res) => {
  const cardsList = new Section(
    {
      items: res,
      renderer: (item) => {
        const card = new Card(item, "#place-card", (data) => {
          const popup = new PopupWithImage(imagePopup);
          popup.open(data);
          popup.setEventListeners();
        });
        const cardElement = card.createCard();
        cardsList.setItem(cardElement);
      },
    },
    cardsGrid
  );
  cardsList.renderItems();
});

editProfileButton.addEventListener("click", openProfilePopup);
addNewPlaceButton.addEventListener("click", openCardPopup);
editProfilePopup.setEventListeners();
createPlaceCardPopup.setEventListeners();
