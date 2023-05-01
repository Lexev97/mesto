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
  profileDescriptionInput,
  profilePopup,
  cardPopup,
  confirmationPopup,
  cardsGrid,
  imagePopupSelector,
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
const imagePopup = new PopupWithImage(imagePopupSelector);
const editProfilePopup = new PopupWithForm(profilePopup, (e, formsData) => {
  e.preventDefault();
  editProfilePopup.savingProcess(true);
  const updatedUserInfo = {
    name: formsData.nameInput,
    about: formsData.descriptionInput,
  };
  api
    .patchProfileInfo(updatedUserInfo)
    .then((res) => {
      if (res.name) {
        userInfo.setUserInfo(res);
        editProfilePopup.close();
      } else {
        return Promise.reject(res);
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => editProfilePopup.savingProcess(false));
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
      if (res.owner) {
        newSection.renderItems([res], res.owner._id);
        createPlaceCardPopup.close();
      } else {
        return Promise.reject(res);
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      createPlaceCardPopup.savingProcess(false);
    });
});
const editAvatarPopup = new PopupWithForm(avatarPopup, (e, formsData) => {
  e.preventDefault();
  editAvatarPopup.savingProcess(true);
  const avatarLink = formsData.avatarLink;
  api
    .patchAvatar(avatarLink)
    .then((res) => {
      if (res.avatar) {
        userInfo.setUserAvatar(res);
        editAvatarPopup.close();
      } else {
        return Promise.reject(res);
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => editAvatarPopup.savingProcess(false));
});
const confirmDeletePopup = new PopupWithConfirmation(
  confirmationPopup,
  (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        if (res.message === "Пост удалён") {
          card.deleteCard();
          confirmDeletePopup.close();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
);
const newSection = new Section(
  {
    renderer: (item, userId) => {
      newSection.setItem(createCard(item, userId));
    },
  },
  cardsGrid
);

const openProfilePopup = () => {
  const inputValues = userInfo.getUserInfo();
  profileNameInput.value = inputValues.userName;
  profileDescriptionInput.value = inputValues.description;
  editProfilePopup.open();
};
const openCardPopup = () => {
  createPlaceCardPopup.open();
};
const openAvatarPopup = () => {
  editAvatarPopup.open();
};
const createCard = (item, userId) => {
  const card = new Card(
    item,
    userId,
    "#place-card",
    (data) => {
      imagePopup.open(data);
    },
    (card) => {
      confirmDeletePopup.open(card);
    },
    (likeCardId) => {
      api
        .putLike(likeCardId)
        .then((res) => {
          if (res.likes) {
            card.changeLikeFilling();
            card.changeLikesAmount(res.likes.length);
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    },
    (dislikeCardId) => {
      api
        .deleteLike(dislikeCardId)
        .then((res) => {
          if (res.likes) {
            card.changeLikeFilling();
            card.changeLikesAmount(res.likes.length);
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  );
  return card.createCard();
};

forms.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});

Promise.all([api.fetchUserInfo(), api.getCardsfromServer()])
  .then(([info, initialCards]) => {
    if (typeof info === "object" && typeof initialCards === "object") {
      userInfo.setUserInfo(info);
      userInfo.setUserAvatar(info);
      newSection.renderItems(initialCards, info._id);
    } else {
      return Promise.reject([info, initialCards]);
    }
  })
  .catch((err) => {
    typeof err[0] === "object"
      ? console.log("Информация о пользователе успешно загружены")
      : console.log(`Ошибка загрузки данных профиля: ${err[0]}`);
    typeof err[1] === "object"
      ? console.log("Карточки успешно загружены")
      : console.log(`Ошибка загрузки карточек: ${err[1]}`);
  });

editProfileButton.addEventListener("click", openProfilePopup);
addNewPlaceButton.addEventListener("click", openCardPopup);
editAvatarButton.addEventListener("click", openAvatarPopup);
editProfilePopup.setEventListeners();
createPlaceCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
imagePopup.setEventListeners();
confirmDeletePopup.setEventListeners();
