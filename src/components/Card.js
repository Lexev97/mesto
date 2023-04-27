class Card {
  constructor(
    data,
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
    this._element.id = this._id;
    this._element.querySelector(".elements__likes-qty").textContent =
      this._data.likes.length;
    this._cardImage = this._element.querySelector(".elements__image");
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;

    if (
      this._data.likes.find((item) => item._id === "7a021f64a5ec44f5f52b639c")
    ) {
      this._buttonLike.classList.toggle("elements__heart_liked");
    }
    if (this._data.owner._id !== "7a021f64a5ec44f5f52b639c") {
      this._element.querySelector(".elements__trashcan").remove();
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
    this._handleItemDelete(this._element);
  }

  _handleLikeProcess() {
    if (
      Array.from(this._buttonLike.classList).includes("elements__heart_liked")
    ) {
      this._handleDislikeClick(this._id);
    } else {
      this._handleLikeClick(this._id);
    }
    this._buttonLike.classList.toggle("elements__heart_liked");
  }

  deleteCard(elementForDelete) {
    elementForDelete.remove();
    elementForDelete = null;
  }
}

export default Card;
