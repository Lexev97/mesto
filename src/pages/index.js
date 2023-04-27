import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import {
  selectors,
  forms,
  editProfileButton,
  addNewPlaceButton,
  profileName,
  profileDescription,
  profileNameInput,
  profileAvatarInput,
  profileDescriptionInput,
  profilePopup,
  cardPopup,
  confirmationPopup,
  cardsGrid,
  imagePopup,
  profileAvatar,
  editAvatarButton,
  avatarPopup,
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
  avatarSelector: profileAvatar,
});
const editProfilePopup = new PopupWithForm(profilePopup, (e, formsData) => {
  e.preventDefault();
  editProfilePopup.savingProcess(true);
  const updatedUserInfo = {
    name: formsData.nameInput,
    about: formsData.descriptionInput,
  };
  api
    .patchProfileInfo(updatedUserInfo)
    .then((res) => userInfo.setUserInfo(res))
    .finally(() => editProfilePopup.savingProcess(false));

  editProfilePopup.close();
});
const createPlaceCardPopup = new PopupWithForm(cardPopup, (e, formsData) => {
  e.preventDefault();
  createPlaceCardPopup.savingProcess(true);
  const cardInfo = {
    name: formsData.placeName,
    link: formsData.imgLink,
  };
  api
    .postNewCard(cardInfo)
    .then((res) => {
      const newCard = new Section(
        {
          items: res,
          renderer: (item) => {
            const card = new Card(
              item,
              "#place-card",
              (data) => {
                const popup = new PopupWithImage(imagePopup);
                popup.open(data);
                popup.setEventListeners();
              },
              (elementForDelete) => {
                const deletePopup = new PopupWithConfirmation(
                  confirmationPopup,
                  () => {
                    api.deleteCard(elementForDelete.id);
                    card.deleteCard(elementForDelete);
                    deletePopup.close();
                  }
                );
                deletePopup.open();
                deletePopup.setEventListeners();
              },
              (likeCardId) => {
                api.putLike(likeCardId).then((res) => {
                  document
                    .getElementById(likeCardId)
                    .querySelector(".elements__likes-qty").textContent =
                    res.likes.length;
                });
              },
              (dislikeCardId) => {
                api.deleteLike(dislikeCardId).then((res) => {
                  document
                    .getElementById(dislikeCardId)
                    .querySelector(".elements__likes-qty").textContent =
                    res.likes.length;
                });
              }
            );
            const cardElement = card.createCard();
            newCard.setItem(cardElement);
          },
        },
        cardsGrid
      );
      newCard.renderItems();
    })
    .finally(() => createPlaceCardPopup.savingProcess(false));

  createPlaceCardPopup.close();
});
const editAvatarPopup = new PopupWithForm(avatarPopup, (e, formsData) => {
  e.preventDefault();
  editAvatarPopup.savingProcess(true);
  const avatarLink = formsData.avatarLink;
  api
    .patchAvatar(avatarLink)
    .then((res) => userInfo.setUserAvatar(res))
    .finally(() => editAvatarPopup.savingProcess(false));

  editAvatarPopup.close();
});

const openProfilePopup = () => {
  profileNameInput.value = userInfo.getUserInfo().userName;
  profileDescriptionInput.value = userInfo.getUserInfo().description;
  editProfilePopup.open();
};
const openCardPopup = () => {
  createPlaceCardPopup.open();
};
const openAvatarPopup = () => {
  profileAvatarInput.value = userInfo.getUserInfo().avatarLink;
  editAvatarPopup.open();
};

forms.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});

api.fetchUserInfo().then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
});
api.getCardsfromServer().then((res) => {
  const cardsList = new Section(
    {
      items: res,
      renderer: (item) => {
        const card = new Card(
          item,
          "#place-card",
          (data) => {
            const popup = new PopupWithImage(imagePopup);
            popup.open(data);
            popup.setEventListeners();
          },
          (elementForDelete) => {
            const deletePopup = new PopupWithConfirmation(
              confirmationPopup,
              () => {
                card.deleteCard(elementForDelete);
                deletePopup.close();
              }
            );
            deletePopup.open();
            deletePopup.setEventListeners();
          },
          (likeCardId) => {
            api.putLike(likeCardId).then((res) => {
              document
                .getElementById(likeCardId)
                .querySelector(".elements__likes-qty").textContent =
                res.likes.length;
            });
          },
          (dislikeCardId) => {
            api.deleteLike(dislikeCardId).then((res) => {
              document
                .getElementById(dislikeCardId)
                .querySelector(".elements__likes-qty").textContent =
                res.likes.length;
            });
          }
        );
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
editAvatarButton.addEventListener("click", openAvatarPopup);
editProfilePopup.setEventListeners();
createPlaceCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
