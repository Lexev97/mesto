class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleItemDelete,
    handleLikeClick,
    handleDislikeClick,
    checkForLikes,
    checkForOwner
  ) {
    this._data = data;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleItemDelete = handleItemDelete;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
    this._checkForLikes = checkForLikes;
    this._checkForOwner = checkForOwner;
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
    this._likesQty = this._element.querySelector(".elements__likes-qty");
    this._likesQty.textContent = this._data.likes.length;
    this._cardImage = this._element.querySelector(".elements__image");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;

    this._checkForLikes(this._data);
    this._checkForOwner(this._data);

    return this._element;
  }

  removeTrashcan() {
    this._element.querySelector(".elements__trashcan").remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._openImagePopup();
    });
    this._element
      .querySelector(".elements__trashcan")
      .addEventListener("click", () => {
        this._openDeleteConfirmationPopup();
      });
    this._buttonLike = this._element.querySelector(".elements__heart");
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeProcess();
    });
  }

  _openImagePopup() {
    this._handleCardClick(this._data);
  }

  _openDeleteConfirmationPopup() {
    this._handleItemDelete(this._id);
  }

  _handleLikeProcess() {
    if (
      Array.from(this._buttonLike.classList).includes("elements__heart_liked")
    ) {
      this._handleDislikeClick(this._id);
    } else {
      this._handleLikeClick(this._id);
    }
  }

  plusMinusLike(likesQty) {
    this._buttonLike.classList.toggle("elements__heart_liked");
    this._likesQty.textContent = likesQty;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
