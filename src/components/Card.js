class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage.addEventListener("click", () => {
      this._openImagePopup();
    });
    this._element
      .querySelector(".elements__trashcan")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._buttonLike = this._element.querySelector(".elements__heart");
    this._buttonLike.addEventListener("click", () => {
      this._toggleLike();
    });
  }

  _openImagePopup() {
    this._handleCardClick(this._data);
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("elements__heart_liked");
  }
}

export default Card;
