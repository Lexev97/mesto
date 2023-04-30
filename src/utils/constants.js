const selectors = {
  inputElement: ".popup__input",
  saveBtnElement: ".popup__save",
  typeErrorMod: "popup__input_type_error",
  errorActiveMod: "popup__input-error_active",
  btnDisabledMod: "popup__save_disabled",
};

const imagePopupSelector = ".image-popup";

const forms = Array.from(document.forms);

const editAvatarButton = document.querySelector(".profile__avatar");
const editProfileButton = document.querySelector(".profile__edit");
const addNewPlaceButton = document.querySelector(".profile__add");
const profileAvatar = ".profile__avatar";
const profileName = ".profile__name";
const profileDescription = ".profile__description";

const avatarPopup = ".avatar-popup";
const profilePopup = ".profile-popup";
const profileAvatarInput = document.querySelector("#avatar-link");
const profileNameInput = document.querySelector("#name-input");
const profileDescriptionInput = document.querySelector("#description-input");
const popupForm = ".popup__form";
const cardPopup = ".card-popup";
const cardsGrid = ".elements__grid";

const confirmationPopup = ".confirmation-popup";

export {
  selectors,
  forms,
  editProfileButton,
  addNewPlaceButton,
  profileName,
  profileDescription,
  profilePopup,
  profileAvatarInput,
  profileNameInput,
  profileDescriptionInput,
  popupForm,
  cardPopup,
  confirmationPopup,
  cardsGrid,
  imagePopupSelector,
  profileAvatar,
  editAvatarButton,
  avatarPopup,
};
