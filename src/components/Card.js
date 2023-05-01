class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleItemDelete,
    handleLikeClick,
    handleDislikeClick
  ) {
    this._data = data;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleItemDelete = handleItemDelete;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
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

    if (this._data.owner._id !== this._userId) {
      this._element.querySelector(".elements__trashcan").remove();
    }

    if (
      this._data.likes
        .map((item) => {
          return item._id;
        })
        .includes(this._userId)
    ) {
      this._buttonLike.classList.add("elements__heart_liked");
    }

    return this._element;
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
    this._handleItemDelete(this);
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

  changeLikeFilling() {
    this._buttonLike.classList.toggle("elements__heart_liked");
  }

  changeLikesAmount(likesQty) {
    this._likesQty.textContent = likesQty;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
