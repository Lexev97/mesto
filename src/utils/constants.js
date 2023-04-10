const selectors = {
  inputElement: ".popup__input",
  saveBtnElement: ".popup__save",
  typeErrorMod: "popup__input_type_error",
  errorActiveMod: "popup__input-error_active",
  btnDisabledMod: "popup__save_disabled",
};

const imagePopup = ".image-popup";
const fullSizeImage = ".popup__image";
const fullSizeImageCaption = ".popup__caption";

const forms = Array.from(document.forms);

const editProfileButton = document.querySelector(".profile__edit");
const addNewPlaceButton = document.querySelector(".profile__add");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profilePopup = document.querySelector(".profile-popup");
const profileNameInput = profilePopup.querySelector("#name-input");
const profileDescriptionInput =
  profilePopup.querySelector("#description-input");
const submitProfilePopupButton = profilePopup.querySelector(".popup__form");

const cardPopup = document.querySelector(".card-popup");
const placeNameInput = cardPopup.querySelector("#place-name");
const imgLinkInput = cardPopup.querySelector("#img-link");
const submitCardPopupButton = cardPopup.querySelector(".popup__form");

const closeButton = ".popup__close";

const cardsGrid = ".elements__grid";

const karachaevsk = new URL("../images/karachaevsk.jpg", import.meta.url);
const elbrus = new URL("../images/elbrus.jpg", import.meta.url);
const dombai = new URL("../images/dombai.jpg", import.meta.url);
const murmansk = new URL("../images/murmansk.jpg", import.meta.url);
const abhazia = new URL("../images/abhazia.jpg", import.meta.url);
const redClearing = new URL("../images/red-clearing.jpg", import.meta.url);

const initialCards = [
  {
    name: "Карачаево-Черкессия",
    link: karachaevsk,
  },
  {
    name: "Гора Эльбрус",
    link: elbrus,
  },
  {
    name: "Домбай",
    link: dombai,
  },
  {
    name: "Мурманск",
    link: murmansk,
  },
  {
    name: "Абхазия",
    link: abhazia,
  },
  {
    name: "Красная поляна",
    link: redClearing,
  },
];

export {
  selectors,
  forms,
  editProfileButton,
  addNewPlaceButton,
  profileName,
  profileDescription,
  profilePopup,
  profileNameInput,
  profileDescriptionInput,
  submitProfilePopupButton,
  cardPopup,
  placeNameInput,
  imgLinkInput,
  submitCardPopupButton,
  closeButton,
  cardsGrid,
  initialCards,
  imagePopup,
  fullSizeImage,
  fullSizeImageCaption,
};
