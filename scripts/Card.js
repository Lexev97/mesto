import { openPopup } from "./index.js";

const imagePopup = document.querySelector(".image-popup");
const fullSizeImage = imagePopup.querySelector(".popup__image");
const fullSizeImageCaption = imagePopup.querySelector(".popup__caption");

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", (e) => {
      this._openImagePopup(e);
    });
    this._element
      .querySelector(".elements__heart")
      .addEventListener("click", (e) => {
        this._toggleLike(e);
      });
    this._element
      .querySelector(".elements__trashcan")
      .addEventListener("click", (e) => {
        this._deleteCard(e);
      });
  }

  _openImagePopup(e) {
    fullSizeImage.src = e.target.src;
    fullSizeImage.alt = e.target.alt;
    fullSizeImageCaption.textContent = e.target.alt;
    openPopup(imagePopup);
  }

  _deleteCard(e) {
    e.target.closest(".elements__element").remove();
  }

  _toggleLike(e) {
    e.target.classList.toggle("elements__heart_liked");
  }
}

export default Card;
